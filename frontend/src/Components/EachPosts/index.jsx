import moment from "moment";
import { useNavigate } from "react-router-dom";
export function EachPost(props) {
  const navigate = useNavigate();
  const postData = props.post;
  const navigateToUserProfile = () => {
    navigate(`/user/${postData.userId}`);
  };
  return (
    <div className="container w-full b">
      <div className="flex items-center space-x-2 pt-4 p-4">
        <img
          className="w-12 h-12 rounded-full"
          src={postData.userAvatar}
          alt="sara"
        />
        <div>
          <h2
            onClick={navigateToUserProfile}
            className="text-gray-800 font-bold cursor-pointer"
          >
            {postData.userName}
          </h2>
          <p className="text-sm font-semibold">
            {moment(postData.createdAt).fromNow()}
          </p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-l font-bold text-gray-800 cursor-pointer">
          {postData.caption}
        </p>
      </div>
      {postData.isPhoto && (
        <img
          className="w-full h-80 cursor-pointer p-4 bg-no-repeat bg-center bg-cover"
          src={postData.photoUrl}
          alt=""
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
                  fill-rule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clip-rule="evenodd"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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
