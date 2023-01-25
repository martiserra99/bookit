import User from "../models/user";
import cloudinary from "cloudinary";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import sendEmail from "../utils/sendEmail";
import absoluteUrl from "next-absolute-url";
import crypto from "crypto";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const registerUser = catchAsyncErrors(async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "bookit/avatars",
    width: "150",
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "Account Registered successfully",
  });
});

const currentUserProfile = catchAsyncErrors(async (req, res) => {
  const user = await User.findOne({ email: req.user.email });

  res.status(200).json({
    success: true,
    user,
  });
});

const updateProfile = catchAsyncErrors(async (req, res) => {
  const user = await User.findOne({ email: req.user.email });

  user.name = req.body.name;
  user.email = req.body.email;

  if (req.body.password) user.password = req.body.password;

  if (req.body.avatar) {
    const image_id = user.avatar.public_id;
    cloudinary.v2.uploader.destroy(image_id);
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "bookit/avatar",
      width: "150",
      crop: "scale",
    });
    user.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  await user.save();

  res.status(200).json({ success: true });
});

const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Get origin
  const { origin } = absoluteUrl(req);

  // Create reset password url
  const resetUrl = `${origin}/password/reset/${resetToken}`;

  const message = `Your password reset url is as follow: \n\n ${resetUrl} \n\n\ If you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "BookIT Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.query.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  // Setup the new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

// Get all users   =>   /api/admin/users
const allAdminUsers = catchAsyncErrors(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

export {
  registerUser,
  currentUserProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
  allAdminUsers,
};
