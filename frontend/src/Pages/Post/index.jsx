import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, likePost } from "../../Redux/Actions";
import { LikeIcon, Toast } from "../../Components";
import moment from "moment";
import Picker from "emoji-picker-react";
export function Post() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [showEmoji, setShowEmoji] = useState(false);
  const [comment, setComment] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { postId } = useParams();
  const { data, loading, error, success } = useSelector((state) => state.post);
  const post = data ? data.post : null;
  const likeData = data ? data.likes : null;
  const handleTyping = (e) => {
    setComment(e.target.value);
  };

  const handleEmojiClick = (e, emojiObject) => {
    setShowEmoji(!showEmoji);
    setComment(comment + emojiObject.emoji);
  };

  const handleNavigateToProfile = () => {
    if (user.id === post.userId) {
      return navigate("/profile");
    }
    navigate(`/profile/${post.userId}`);
  };
  useEffect(() => {
    dispatch(getPost(postId));
  }, []);

  const handleLike = async () => {
    setMessage("");
    const response = await dispatch(likePost(postId));
    if (response) {
      return setMessage("You liked this post");
    }
    return setMessage("You unliked this post");
  };
  if (!loading && error && !success) {
    return (
      <div className="text-black flex-col w-full h-screen flex justify-center align-center texts-center bg-slate-50">
        <p className="text-xl">404 || Post Not Found.</p>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="text-black flex-col w-full h-screen flex justify-center align-center texts-center">
        <div
          className="w-10 mb-10 h-10 rounded-full animate-spin
                border-2 border-dashed border-black-600 border-t-black mr-1"
        ></div>
        <p>Fetching Post</p>
      </div>
    );
  }
  return (
    !loading &&
    success && (
      <div className="w-2/3 bg-white block mobile:w-full mobile:py-0 min-h-full">
        <div className="flex bg-white shadow-md rounded-lg mx-auto">
          <div className="flex items-center w-full">
            <div className="w-full">
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
                    onClick={handleNavigateToProfile}
                    className="text-gray-600 text-sm font-semibold cursor-pointer"
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
              <div className="mt-5">
                <div className="text-black font-medium text-sm mb-6 mx-3 px-2">
                  {post.caption}
                </div>
              </div>
              {post.isPhoto && (
                <div className="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
                  <img
                    className="object-cover rounded w-full h-80 bg-dunes bg-cover bg-center object-cover"
                    src={post.photoUrl}
                  />
                </div>
              )}
              <div className="flex justify-start mb-4 border-t border-gray-100">
                <div className="flex w-full mt-1 pt-2 pl-5">
                  <span
                    onClick={handleLike}
                    className={`transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2 ${
                      likeData.isLiked ? "bg-blue-600" : "bg-white"
                    }`}
                  >
                    <LikeIcon
                      className={`${likeData.isLiked && "fill-white"}`}
                    />
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
              <div className="flex w-full border-t border-gray-100">
                <div className="mt-3 mx-5 flex flex-row">
                  <div className="flex text-gray-700 font-normal text-sm rounded-md mb-2 mr-4 items-center">
                    Comments:
                    <div className="ml-1 text-gray-400 font-thin text-ms">
                      30
                    </div>
                  </div>
                  <div className="flex text-gray-700 font-normal text-sm rounded-md mb-2 mr-4 items-center">
                    Views:
                    <div className="ml-1 text-gray-400 font-thin text-ms">
                      60k
                    </div>
                  </div>
                </div>
                <div className="mt-3 mx-5 w-full flex justify-end">
                  <div className="flex text-gray-700 font-normal text-sm rounded-md mb-2 mr-4 items-center">
                    Likes:
                    <div className="ml-1 text-gray-400 font-thin text-ms">
                      {likeData.likes}
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative flex items-center self-center w-full p-4 text-gray-600 focus-within:text-gray-400">
                <img
                  className="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer"
                  alt="User avatar"
                  src={user.avatar}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-6">
                  <button
                    type="submit"
                    className="p-1 focus:outline-none focus:shadow-none hover:text-blue-500"
                  >
                    <svg
                      className="w-6 h-6 transition ease-out duration-300 hover:text-blue-500 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={() => setShowEmoji(!showEmoji)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </span>
                <input
                  type="search"
                  className="w-full rounded-3xl py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                  placeholder="Post a comment..."
                  autoComplete="off"
                  onChange={handleTyping}
                  value={comment}
                />
                {showEmoji && (
                  <div className="absolute right-0 top-0 pr-6">
                    <Picker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {message && <Toast message={message} success={true} />}
      </div>
    )
  );
}
