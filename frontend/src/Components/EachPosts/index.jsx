import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LikeIcon } from "../Icons";
export function EachPost(props) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const post = props.post;
  const navigateToUserProfile = () => {
    if (user.id !== post.userId) {
      return navigate(`/user/${post.userId}`);
    }
    return navigate("/profile");
  };
  const navigateToPost = () => {
    navigate(`/post/${post._id}`);
  };
  return (
    <div className="container w-full b">
      <div className="flex flex-row mt-2 px-2 py-3 mx-3">
        <div className="w-auto h-auto rounded-full border-2 border-indigo-600">
          <img
            className="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
            alt="User avatar"
            src={post.userAvatar}
          />
        </div>
        <div className="flex flex-col mb-2 ml-4 mt-1">
          <div
            onClick={navigateToUserProfile}
            className="text-gray-600 text-sm font-semibold cursor-pointer hover:text-black"
          >
            {post.userName}
          </div>
          <div className="flex w-full mt-1">
            <div className="text-gray-400 font-thin text-xs">
              {moment(post.createdAt).fromNow()}
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-100" />
      <div onClick={navigateToPost} className="mt-5">
        <div className="text-black font-medium text-sm mb-6 mx-3 px-2 cursor-pointer">
          {post.caption}
        </div>
      </div>
      {post.isPhoto && (
        <img
          className="w-full h-80 cursor-pointer p-4 bg-no-repeat bg-center bg-cover"
          src={post.photoUrl}
          alt={post.caption}
          onClick={navigateToPost}
        />
      )}
      <div className="flex justify-start mb-4 border-t border-gray-100">
        <div className="flex w-full mt-1 pt-2 pl-5">
          <span
            className={`transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2
                     "bg-blue-600  bg-white
                    }`}
          >
            <LikeIcon />
          </span>
          <img
            className="inline-block object-cover w-8 h-8 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <img
            className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <img
            className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
            alt=""
          />
          <img
            className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div className="flex justify-end w-full mt-1 pt-2 pr-5">
          <span className="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              width="14px"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </span>
          <span className="transition ease-out duration-300 hover:bg-blue-500 bg-blue-600 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              width="14px"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </span>
        </div>
      </div>
      <hr className="border-gray-600" />
    </div>
  );
}
