import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendFriendRequest } from "../../Redux/Actions";
export function ExploreCard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = props.user;
  const handleNavigate = (event) => {
    if (event.target.tagName === "BUTTON") {
      return (
        dispatch(sendFriendRequest(user._id)) &&
        dispatch({ type: "SEND_REQUEST_FROM_EXPLORE", payload: user._id })
      );
    }
    navigate(`/user/${user._id}`);
  };
  return (
    <div className="w-max mobile:w-full mt-4 lg:w-full desktop:w-full">
      <div className="cursor-pointer card p-2 border hover:shadow-none relative flex flex-col shadow-lg">
        <div
          onClick={handleNavigate}
          className="profile w-72 flex m-3 ml-4 text-white"
        >
          <img
            className="w-20 h-20 bg-white rounded-full"
            src={user.avatar}
            alt=""
          />
          <div className="ml-3 flex flex-col overflow-hidden">
            <div className="name font-bold break-words text-black whitespace-nowrap overflow-hidden text-ellipsis">
              {user.name}
            </div>
            <p className="text-black font-sm whitespace-nowrap overflow-hidden text-ellipsis">
              {user.bio}
            </p>
          </div>
        </div>
        <div className="buttons flex absolute bottom-0 font-bold right-0 text-xs text-gray-500 space-x-0 my-3.5 mr-3">
          <button
            onClick={handleNavigate}
            className="bg-indigo-500 text-white p-2 font-semibold rounded-xl"
            disabled={user.isRequested}
          >
            {user.isRequested ? "Request Sent" : "Add Friend"}
          </button>
        </div>
      </div>
    </div>
  );
}
