import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LikeIcon, BookMarkIcon, Toast } from "..";
export function EachPost(props) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const post = props.post;
  const like = props.post.likes;
  const [isOpen, setIsOpen] = useState(false);
  const navigateToUserProfile = () => {
    if (user.id !== post.userId) {
      return navigate(`/user/${post.userId}`);
    }
    return navigate("/profile");
  };
  const navigateToPost = () => {
    navigate(`/post/${post._id}`);
  };
  const RenderOptions = () => {
    const [message, setMessage] = useState("");
    const handleReport = () => {
      setMessage("");
      // setIsOpen(false);
      setMessage(() => "Work under progress");
    };
    return (
      <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
        {user.id === post.userId && props.superAccess && (
          <>
            <p
              onClick={() =>
                setIsOpen(!isOpen) || props.handleDeletePost(post._id)
              }
              className="pointer text-gray-500 font-medium hover:text-gray-900 hover:bg-gray-50 block px-4 py-2 text-sm"
            >
              Delete Post
            </p>
            <p className="pointer text-gray-500 font-medium hover:text-gray-900 hover:bg-gray-50 block px-4 py-2 text-sm">
              Edit Post
            </p>
          </>
        )}
        <p
          onClick={() => handleReport()}
          className="pointer text-gray-500 font-medium hover:text-gray-900 hover:bg-gray-50 block px-4 py-2 text-sm"
        >
          Report Post
        </p>
        {message && <Toast message={message} success={true} />}
      </div>
    );
  };
  return (
    <div className="container overflow-x-hidden w-full">
      <div className="pr-4 flex justify-between flex-row mt-2 px-2 py-3 mx-3 w-full">
        <div className="flex">
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
        <div className="items-center text-center">
          <div className="flex items-center w-full h-full">
            <div className="inline-block relative text-left">
              <button
                type="button"
                className="flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="sr-only" />
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
              {isOpen && <RenderOptions />}
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-100" />
      <div onClick={navigateToPost} className="mt-5">
        <div
          className={`text-black font-medium text-sm mx-3 px-2 cursor-pointer ${
            post.isPhoto ? "mb-2" : "mb-6"
          }`}
        >
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
      <div className="flex justify-start mb-4 border-t border-gray-100 texts-center item-center">
        <div className="flex w-full mt-1 pt-2 pl-5">
          <span
            className={`transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2 ${
              like.isLiked ? "bg-blue-600" : "bg-white"
            }`}
            onClick={() => props.handleLike(post._id)}
          >
            <LikeIcon className={`${like.isLiked && "fill-white"}`} />
          </span>
          <p className="mt-2 text-gray-600 text-sm">{`${
            like.isLiked
              ? `You ${like.count > 1 ? `and ${like.count - 1} other` : ""}`
              : like.count
          }`}</p>
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
          <span
            onClick={() => props.handleBookmark(post._id)}
            className={`transition ease-out duration-300 border w-8 h-8 px-2 pt-2 text-center rounded-full cursor-pointer mr-2 ${
              post.isBookmarked ? "bg-blue-600 text-white" : "bg-white-100"
            }`}
          >
            <BookMarkIcon className={`h-4 w-4 top-0`} />
          </span>
        </div>
      </div>
      <hr className="border-gray-600" />
    </div>
  );
}
