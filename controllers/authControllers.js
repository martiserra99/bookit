import User from "../models/user";
import cloudinary from "cloudinary";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

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

export { registerUser, currentUserProfile, updateProfile };
