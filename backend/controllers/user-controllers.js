const User = require("../models/user-model");
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found !",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User found successfully",
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
        bio: user.bio,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Error",
    });
  }
};

module.exports = { getUserProfile };
