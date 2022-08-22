const userModel = require("../schema/users");
const UserVerification = require("../schema/userVerifications");
const User = require("../schema/users");
const nodemailer = require("nodemailer");
const { hashPassword, signToken, verifyToken } = require("../utils");
const { errorMessage, successMessage } = require("../controllers/message");
const dateParser = (val) => Date.parse(val);
const messages = require("../lang/messages.json");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

const sendVerificationEmail = async ({ _id, email }, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    // mail options
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `<p>your otp is </P><strong> ${otp} </strong>`,
    };
    const newOtpVerification = new UserVerification({
      userId: _id,
      otp: otp,
      createdAt: new Date(),
      expiredAt: new Date().setMinutes(new Date().getMinutes() + 10),
    });
    await newOtpVerification.save();

    await transporter.sendMail(mailOptions);
    let data = { userId: _id, email: email };
    successMessage(res, messages.successMessages.otpSentSuccess, data);
  } catch (error) {
    console.log("MAIL ERRROR");
    errorMessage(res, error);
  }
};
module.exports = {
  register: async (req, res) => {
    try {
      const { password, email } = req.body;

      const isEmailTaken = await userModel.findOne({ email });
      if (isEmailTaken)
        return res
          .status(400)
          .json({ status: "error", message: "Email already exists" });

      const { salt, hash } = hashPassword(password);

      delete req.body.password;

      let result = await userModel.create({ ...req.body, salt, hash });
      sendVerificationEmail(result, res);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  login: async (req, res) => {
    try {
      const { password, email } = req.body;

      const userData = await userModel
        .findOne({ email })
        .populate("role", "name");

      if (!userData)
        return res
          .status(400)
          .json({ status: "error", message: "User is not registered" });
      if (!userData.verified)
        return res
          .status(400)
          .json({ status: "error", message: "User email is not verified" });

      const hashedPass = hashPassword(password, userData.salt);

      if (hashedPass.hash === userData.hash) {
        let user = await userModel
          .findOne({ email }, { __v: 0 })
          .populate("role", "name permissions");
        const payload = {
          email: req.body.email,
          userId: user.id,
          role: userData.role.name,
          firstName: user.firstName,
          lastName: user.lastName,
        };
        const tk = signToken(payload);
        return res.status(200).json({
          status: "success",
          message: "User logged in",
          token: tk,
        });
      }
      return res
        .status(400)
        .json({ status: "error", message: "Incorrect password" });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  verifyUser: async (req, res) => {
    try {
      const data = verifyToken(req.headers.authorization);
      if (data)
        res.status(200).json({ status: "success", message: "Verified", data });
      else
        res.status(400).json({ status: "error", message: "Unauthorized user" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  verifyOtp: async (req, res) => {
    try {
      let { userId, otp } = req.body;
      if (!userId || !otp) {
        errorMessage(res, messages.errorMessages.emptyOtp);
      } else {
        const userVerificationRecord = await UserVerification.find({
          userId: userId,
        });
        if (userVerificationRecord.length <= 0) {
          errorMessage(res, messages.errorMessages.accountRecord);
        } else {
          // check expiry
          const { expiredAt } = userVerificationRecord[0];
          const originalOtp = userVerificationRecord[0].otp;
          if (dateParser(expiredAt) < Date.now()) {
            // otp expired
            await UserVerification.delete({ userId });
            errorMessage(res, messages.errorMessages.expireOtp);
          } else {
            // success
            if (otp === originalOtp) {
              await User.updateOne({ _id: userId }, { verified: true });
              await UserVerification.delete({ userId: userId });
              successMessage(res, messages.successMessages.verifySuccess);
            } else {
              errorMessage(res, messages.errorMessages.otpNotMatch);
            }
          }
        }
      }
    } catch (error) {
      let message = error;
      errorMessage(res, message);
    }
  },
  sendResetOtp: async (req, res) => {
    let { email } = req.body;
    if (!email || email == "")
      errorMessage(res, messages.errorMessages.emptyEmail);
    try {
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      const user = await User.findOne({ email });
      // mail options
      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Otp to reset your password",
        html: `<p>your otp is </P><strong> ${otp} </strong>`,
      };
      const newOtpVerification = new UserVerification({
        userId: user.id,
        otp: otp,
        createdAt: new Date(),
        expiredAt: new Date().setMinutes(new Date().getMinutes() + 10),
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      await newOtpVerification.save();
      await transporter.sendMail(mailOptions);
      const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: 60 * 10 });
      let responseData = { userId: user.id, token: authToken };
      successMessage(
        res,
        messages.successMessages.otpSentSuccess,
        responseData
      );
    } catch (error) {
      errorMessage(res, error);
    }
  },

  resetPassword: async (req, res) => {
    try {
      let { userId, newPassword, otp } = req.body;
      const userVerificationRecord = await UserVerification.find({
        userId: userId,
      });
      if (userVerificationRecord.length <= 0) {
        errorMessage(res, messages.errorMessages.accountRecord);
      } else {
        // check expiry
        const { expiredAt } = userVerificationRecord[0];
        const originalOtp = userVerificationRecord[0].otp;
        if (currentDateTime(expiredAt) < Date.now()) {
          // otp expired
          await UserVerification.delete({ userId });
          errorMessage(res, messages.errorMessages.expireOtp);
        } else {
          // success
          if (otp === originalOtp) {
            await User.updateOne({ _id: userId }, { verified: true });
            await UserVerification.delete({ userId });
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(newPassword, salt);
            await User.findOneAndUpdate({ _id: userId, salt, hash });
            successMessage(res, messages.successMessages.resetSuccess);
          } else {
            errorMessage(res, messages.errorMessages.otpNotMatch);
          }
        }
      }
    } catch (err) {
      errorMessage(res, err);
    }
  },
};
