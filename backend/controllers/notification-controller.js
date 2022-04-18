import Notification from "../models/Notification.js";

// @desc    User Notificaion
// @route   GET /api/v1/notification
// @access  Private

const getNotifications = async (req, res) => {
  const { id } = req.data;
  try {
    const notifications = await Notification.find({ to: id })
      .select("createdAt message seen type url id")
      .sort({ createdAt: -1 });
    if (notifications.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No Notification found!",
        notifications: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: "Notification fetched successfully",
      notifications,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

const notificationMarkAsSeen = async (req, res) => {
  const { id } = req.data;
  const { notificationId } = req.body;
  try {
    const notification = await Notification.findOne({ _id: notificationId });
    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found!" });
    }
    if (notification.to.toString() !== id) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found!" });
    }
    notification.seen = true;
    const savedNotification = await notification.save();
    return res.status(200).json({
      success: true,
      message: "Notification marked as seen successfully",
      notification: savedNotification,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export { getNotifications, notificationMarkAsSeen };
