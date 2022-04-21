import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchNotification, markAsSeen } from "../../Redux/Actions";
import {
  NotificationIcon,
  FriendRequestPendingIcon,
  FriendRequestAcceptedIcon,
  MessageIcon,
} from "../../Components";
import moment from "moment";
export function Notification() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, notifications } = useSelector(
    (state) => state.notification
  );
  useEffect(() => {
    dispatch(fetchNotification());
  }, []);
  const NotificationComponent = (props) => {
    const notification = props.notification;
    const navigateUser = () => {
      !notification.seen && dispatch(markAsSeen(notification._id));
      navigate(notification.url);
    };
    return (
      <div
        className="w-full mt-2 mb-2 cursor-pointer"
        onClick={() => navigateUser()}
      >
        <div className="flex">
          <div
            className={`w-full rounded-2xl h-20 flex items-center p-2 shadow ${
              !notification.seen && "bg-gray-100"
            }`}
          >
            {notification.type === "friend_request" && (
              <FriendRequestPendingIcon
                className="bg-indigo-600 h-10 w-10 flex items-center text-center rounded-xl mr-2"
                fill="white"
              />
            )}
            {notification.type === "friend_accept" && (
              <FriendRequestAcceptedIcon
                className="bg-green-600 h-10 w-10 flex items-center text-center rounded-xl mr-2"
                fill="white"
              />
            )}
            {notification.type === "like_post" && (
              <MessageIcon
                className="bg-blue-600 h-10 w-10 flex items-center text-center rounded-xl mr-2"
                fill="white"
              />
            )}
            <div className="flex w-full justify-between">
              <p className="text-black font-semibold">{notification.message}</p>
              <p className="font-semibold text-sm">
                {moment(notification.createdAt).fromNow()}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="w-2/3 bg-white block p-2 mobile:w-full mobile:py-0 min-h-screen">
      <div className="w-full p-4 bg-indigo-100 flex text-center items-center gap-2 rounded-2xl">
        <h2 className="text-2xl font-bold">Notifications</h2>
        <NotificationIcon className="h-8 w-8" />
      </div>
      {loading && (
        <div className="w-full flex flex-col justify-center text-center items-center mt-4">
          <div
            className="w-10 mb-10 h-10 rounded-full animate-spin
                    border-2 border-dashed border-black-600 border-t-black mr-1"
          ></div>
          <p>Getting Notification for You.</p>
        </div>
      )}
      {success && notifications.length >= 1
        ? notifications.map((eachNotification) => {
            return (
              <NotificationComponent
                key={eachNotification._id}
                notification={eachNotification}
              />
            );
          })
        : success &&
          notifications.length === 0 && (
            <div className="w-full h-40 border bg-indigo-200 rounded-xl flex justify-center text-center items-center mt-4">
              <h1 className="text-xl font-bold">No Nofification Found.</h1>
            </div>
          )}
    </div>
  );
}
