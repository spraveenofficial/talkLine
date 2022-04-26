import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export function EachPost(props) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const postData = props.post;
  const navigateToUserProfile = () => {
    if (user.id !== postData.userId) {
      return navigate(`/user/${postData.userId}`);
    }
    return navigate("/profile");
  };
  const navigateToPost = () => {
    navigate(`/post/${postData._id}`);
  };
  return (
    <div className="container w-full b">
      <div className="flex flex-row mt-2 px-2 py-3 mx-3">
        <div className="w-auto h-auto rounded-full border-2 border-indigo-600">
          <img
            className="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
            alt="User avatar"
            src={postData.userAvatar}
          />
        </div>
        <div className="flex flex-col mb-2 ml-4 mt-1">
          <div
            onClick={navigateToUserProfile}
            className="text-gray-600 text-sm font-semibold cursor-pointer hover:text-black"
          >
            {postData.userName}
          </div>
          <div className="flex w-full mt-1">
            <div className="text-gray-400 font-thin text-xs">
              {moment(postData.createdAt).fromNow()}
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-100" />
      <div onClick={navigateToPost} className="mt-5">
        <div className="text-black font-medium text-sm mb-6 mx-3 px-2 cursor-pointer">
          {postData.caption}
        </div>
      </div>
      {postData.isPhoto && (
        <img
          className="w-full h-80 cursor-pointer p-4 bg-no-repeat bg-center bg-cover"
          src={postData.photoUrl}
          alt={postData.caption}
          onClick={navigateToPost}
        />
      )}
      <div className="flex p-4 justify-between">
        <div className="flex space-x-2">
          <div className="flex space-x-1 items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-red-500 hover:text-red-400 transition duration-100 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span>20</span>
          </div>
          <div className="flex space-x-1 items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-gray-600 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </span>
            <span>22</span>
          </div>
        </div>
      </div>
      <hr className="border-gray-600" />
    </div>
  );
}
