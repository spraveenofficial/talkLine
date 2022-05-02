import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  sendFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  unfriendUser,
} from "../../Redux/Actions";

export function ProfileButton(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = props.user.isRequested;
  const { id } = useParams();
  const handleSendFriendRequest = () => {
    dispatch(sendFriendRequest(id));
  };
  const handleCancelFriendRequest = () => {
    dispatch(cancelFriendRequest(id));
  };
  const handleAcceptFriendRequest = () => {
    dispatch(acceptFriendRequest(id));
  };
  const handleUnfriend = async () => {
    const response = await dispatch(unfriendUser(id));
    if (response) {
      dispatch({
        type: "UNFRIEND_FRIEND_PROFILE",
      });
    }
  };
  const handleNavigateToChat = () => {
    const transfromData = {
      id: props.user._id,
      ...props.user,
    };
    dispatch({
      type: "MESSAGE_SELECT",
      payload: transfromData,
    });
    navigate("/messages");
  };
  return (
    <>
      {!user.isFriend && !user.haveSentRequest && !user.haveToAccept ? (
        <button
          onClick={() => handleSendFriendRequest()}
          className="bg-indigo-600 text-white mt-3 font-bold p-2 rounded-xl w-max hover:bg-indigo-800"
        >
          Send Request
        </button>
      ) : user.haveSentRequest && !user.isFriend ? (
        <button
          onClick={() => handleCancelFriendRequest()}
          className="bg-indigo-600 text-white mt-3 font-bold p-2 rounded-xl w-max hover:bg-indigo-800"
        >
          Cancel Request
        </button>
      ) : (
        user.isFriend && (
          <div className="gap-2 flex">
            <button
              onClick={() => handleNavigateToChat()}
              className="bg-indigo-600 text-white mt-3 font-bold p-2 rounded-xl w-max hover:bg-indigo-800"
            >
              Message
            </button>
            <button
              onClick={() => handleUnfriend()}
              className="bg-red-600 text-white mt-3 font-bold p-2 rounded-xl w-max hover:bg-red-800"
            >
              Unfriend
            </button>
          </div>
        )
      )}
      {!user.isFriend && user.haveToAccept && (
        <div className="flex">
          <button
            onClick={() => handleAcceptFriendRequest()}
            className="bg-green-600 text-white mt-3 font-bold p-2 rounded-xl w-max hover:bg-green-800"
          >
            Accept Request
          </button>
          <button
              onClick={() => handleCancelFriendRequest()}
            className="bg-red-600 ml-1 text-white mt-3 font-bold p-2 rounded-xl w-max hover:bg-indigo-800"
          >
            Cancel Request
          </button>
        </div>
      )}
    </>
  );
}
