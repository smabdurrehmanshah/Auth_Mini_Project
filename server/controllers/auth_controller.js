import { User } from "../models/user_model.js";
import { uploadOnCloudinary } from "../services/cloudinary.js";
import { userRegistrationSchema } from "../validators/auth_validator.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//* Function postRegister
export const postRegister = async (req, res) => {
  const { data, error } = userRegistrationSchema.safeParse(req.body);

  if (error) return res.status(400).json({ message: error.issues[0].message });

  const { username, email, password } = data;

  try {
    const isUserExit = await User.findOne({ email });

    if (isUserExit)
      return res.status(400).json({ message: "User already exist!" });

    if (!req.file)
      return res.status(400).json({ message: "Profile Image is required!" });

    const uploadedImage = await uploadOnCloudinary(req.file.path);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      profileImage: {
        url: uploadedImage.url,
        public_id: uploadedImage.public_id,
      },
    });

    res.status(201).json({
      message: "User registered successfully!",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage.url,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", isSuccess: false });
  }
};

//* Function postLogin
export const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ isSuccess: false, message: "Invalid email or password" });

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched)
      return res
        .status(400)
        .json({ isSuccess: false, message: "Invalid email or password" });

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const cookieOptions = {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, //* 7 days
    };

    res.cookie("access_token", token, cookieOptions);

    const userData = user.toObject();
    delete userData.password;
    if(userData.profileImage)
      userData.profileImage = userData.profileImage.url;

    return res.status(200).json({
      isSuccess: true,
      message: "Log In successfully",
      user: userData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", isSuccess: false });
  }
};


//* Function logout
export const logout = (req, res) => {
  res.clearCookie("access_token");
  return res.status(200).json({
    isSuccess: true,
    message: "Logged out successfully"
  })
}