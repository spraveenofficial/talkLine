import User from "../models/User.js";
const getProfile = async (req, res) => {
  const { id } = req.data;
  try {
    const user = await User.findOne({ _id: id }).select("id name email avatar");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    } else {
      return res.json({
        message: "User fetched successfully",
        success: true,
        data: { ...user._doc, isMyProfile: true },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

const getEachProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id }).select("id name email avatar");
    if (!user) {
      res.status(404).json({ success: false, message: "User not found!" });
    }
    res.json({ message: "User fetched successfully", success: true, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

const seachUser = async (req, res) => {
  const { name } = req.body;
  try {
    const users = await User.find({
      name: { $regex: name, $options: "i" },
    }).select("id name email avatar");
    if (users.length === 0) {
      res.status(404).json({ success: false, message: "User not found!" });
    }
    res.json({ message: "User fetched successfully", success: true, users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export { getProfile, getEachProfile, seachUser };
