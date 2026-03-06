import redisClient from "../config/redis.js";
import { User } from "../models/user_model.js";

export const getAllUsers = async (req, res) => {
  try {
    const cacheKey = "all_users";

    const cachedUsers = await redisClient.get(cacheKey);

    if (cachedUsers) {
      console.log("Serving from Redis Cache");
      return res.status(200).json({
        isSuccess: true,
        message: "All users",
        users: JSON.parse(cachedUsers),
        count: JSON.parse(cachedUsers).length,
      });
    }

    console.log("Fetching from Database");

    const users = await User.find().select("-password").lean();

    const usersData = users.map((user) => ({
      ...user,
      profileImage: user.profileImage.url,
    }));

    await redisClient.set(cacheKey, JSON.stringify(usersData), {
      EX: 60,
    });

    return res.status(200).json({
      isSuccess: true,
      message: "All users",
      users: usersData,
      count: usersData.length,
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: "Internal server error",
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user)
      return res
        .status(404)
        .json({ isSuccess: false, message: "User not found" });

    const userData = user.toObject();

    if (userData.profileImage)
      userData.profileImage = userData.profileImage.url;

    return res.status(200).json({ isSuccess: true, user: userData });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: "Internal server error",
    });
  }
};
