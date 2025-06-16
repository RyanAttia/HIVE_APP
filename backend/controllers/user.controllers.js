import User from '../models/user.model.js';
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const updateUserStatus = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { userStatus } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status: userStatus },
      { new: true } // return updated document
    ).select("status");

    res.status(200).json(updatedUser); // Send status only
  } catch (error) {
    console.error("Error updating user status:", error.message);
    res.status(500).json({ error: "Failed to update user status" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by username:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};