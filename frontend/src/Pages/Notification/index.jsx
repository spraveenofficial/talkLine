import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchNotification } from "../../Redux/Actions";
import { NotificationIcon, FriendRequestPendingIcon } from "../../Components";
export function Notification() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, success, notifications, message } = useSelector(
    (state) => state.notification
  );
  useEffect(() => {
    dispatch(fetchNotification());
  }, []);
  const NotificationComponent = (props) => {
    const notification = props.notification;
    const navigateUser = () => {
      navigate(notification.url);
    };
    return (
      <div
        className="w-full mt-2 cursor-pointer"
        onClick={() => navigateUser()}
      >
        <div className="flex flex-col">
          <div className={`w-full ${!notification.seen && "bg-indigo-100"}`}>
            <div className="w-full h-20 flex items-center p-2 shadow">
              <FriendRequestPendingIcon
                className="bg-indigo-400 h-10 w-10 flex items-center text-center rounded-xl mr-2"
                fill="white"
              />
              <p className="text-black font-semibold">{notification.message}</p>
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
          notifications.length === 0 && <h1>No Notification Found.</h1>}
    </div>
  );
}
