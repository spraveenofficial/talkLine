import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, likePost, bookmark, addComment } from "../../Redux/Actions";
import { LikeIcon, Toast, BookMarkIcon } from "../../Components";
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
  const [isReply, setIsReply] = useState(false);
  const [replyTo, setReplyTo] = useState("");
  const [replyToUserName, setReplyToUserName] = useState("");
  const { data, loading, error, success } = useSelector((state) => state.post);
  const post = data ? data.post : null;
  const likeData = data ? data.likes : null;
  const comments = data ? data.comments : [];
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
    navigate(`/user/${post.userId}`);
  };

  useEffect(() => {
    dispatch(getPost(postId));
  }, []);

  useEffect(() => {
    if (isReply) {
      if (comment.includes(replyToUserName)) return;
      else {
        setIsReply(false);
        setReplyTo("");
        setReplyToUserName("");
      }
    }
  }, [comment, isReply, replyToUserName]);
  const handleLike = async () => {
    setMessage("");
    const response = await dispatch(likePost(postId));
    if (response) {
      dispatch({
        type: "LIKE_UPDATE_REQUEST",
      });
      return setMessage("You liked this post");
    }
    dispatch({
      type: "UNLIKE_UPDATE_REQUEST",
    });
    return setMessage("You unliked this post");
  };

  const handleBookMark = async () => {
    setMessage("");
    const response = await dispatch(bookmark(postId));
    if (response) {
      dispatch({
        type: "BOOKMARK_UPDATE_REQUEST",
        payload: true,
      });
      return setMessage("You bookmarked this post");
    }
    dispatch({
      type: "BOOKMARK_UPDATE_REQUEST",
      payload: false,
    });
    return setMessage("You unbookmarked this post");
  };

  const handlePushToReply = (userName, commentId) => {
    setComment(`${userName} `);
    setIsReply(true);
    setReplyTo(commentId);
    setReplyToUserName(userName);
  };

  const handleCommentReply = async () => {
    const commentText = comment.replace(replyToUserName, "").trim();
    if (commentText.length < 1) {
      return setMessage("Comment cannot be empty");
    }
    setMessage("");
    const response = await dispatch(
      addComment({ postId, comment: commentText, commentId: replyTo })
    );
    if (response) {
      setComment("");
      setIsReply(false);
      setReplyTo("");
      setReplyToUserName("");
      return setMessage("Comment added successfully");
    }
  };

  const handleComment = async () => {
    if (isReply) {
      return handleCommentReply();
    }
    setMessage("");
    const response = await dispatch(addComment({ postId, comment }));
    if (response) {
      setComment("");
      setShowEmoji(false);
      return setMessage("You commented on this post");
    }
  };
  const CommentsComponent = () => {
    return (
      <div className="comments">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="flex items-center bg-white ">
              <div className="bg-white text-black ml-4 mt-2 antialiased flex max-w-lg">
                <img
                  className="rounded-full h-10 w-10 mr-2 mt-1 "
                  src={comment.userAvatar}
                  alt={comment.userAvatar}
                />
                <div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 pt-2 pb-2.5">
                    <div
                      className="text-gray-600 text-sm font-semibold cursor-pointer"
                      onClick={handleNavigateToProfile}
                    >
                      {comment.userName}
                    </div>
                    <div className="text-black font-medium text-sm">
                      {comment.comment}
                    </div>
                  </div>
                  <div className="text-sm ml-4 mt-0.5 text-center item-center text-gray-500">
                    <span
                      onClick={() =>
                        handlePushToReply(comment.userName, comment._id)
                      }
                      className="text-gray-500 pointer mr-2 hover:text-gray-400"
                    >
                      Reply
                    </span>
                    <span className="mt-1">
                      {moment(comment.createdAt).fromNow()}
                    </span>
                  </div>
                  {comment.replies.length > 0 &&
                    comment.replies.map((reply) => {
                      return (
                        <div
                          key={reply._id}
                          className="flex items-center bg-white "
                        >
                          <div className="bg-white text-black ml-4 mt-2 antialiased flex max-w-lg">
                            <img
                              className="rounded-full h-10 w-10 mr-2 mt-1 "
                              src={reply.userAvatar}
                            />
                            <div>
                              <div className="bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 pt-2 pb-2.5">
                                <div className="text-gray-600 text-sm font-semibold cursor-pointer">
                                  {reply.userName}
                                </div>
                                <div className="text-black font-medium text-sm align-left">
                                  {reply.comment}
                                </div>
                              </div>
                              <div className="text-sm ml-4 mt-0.5 text-center item-center text-gray-500">
                                <span className="mt-1">
                                  {moment(reply.createdAt).fromNow()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            No comments yet, be the first one.
          </div>
        )}
      </div>
    );
  };

  if (!loading && error && !success) {
    return (
      <div className="text-black flex-col w-2/3 mobile:w-full h-screen flex justify-center align-center texts-center bg-slate-50">
        <p className="text-xl">404 || Post Not Found.</p>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="text-black flex-col w-2/3 h-screen flex justify-center align-center texts-center mobile:w-full">
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
                  <p className="mt-2 text-gray-600 text-sm">{`${
                    likeData.isLiked
                      ? `You ${
                          likeData.likes > 1
                            ? `and ${likeData.likes - 1} other`
                            : ""
                        }`
                      : likeData.likes
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
                    onClick={handleBookMark}
                    className={`transition ease-out duration-300 border w-8 h-8 px-2 pt-2 text-center rounded-full cursor-pointer mr-2 ${
                      post.isBookmarked
                        ? "bg-blue-600 text-white"
                        : "bg-white-100"
                    }`}
                  >
                    <BookMarkIcon className={`h-4 w-4`} />
                  </span>
                </div>
              </div>
              <div className="flex w-full border-t border-gray-100">
                <div className="mt-3 mx-5 flex flex-row">
                  <div className="flex text-gray-700 font-normal text-sm rounded-md mb-2 mr-4 items-center">
                    Comments:
                    <div className="ml-1 text-gray-400 font-thin text-ms">
                      {comments.length}
                    </div>
                  </div>
                </div>
              </div>
              <CommentsComponent />
              <div className="relative flex items-center self-center w-full p-4 text-gray-600 focus-within:text-gray-400">
                <img
                  className="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer"
                  alt="User avatar"
                  src={user.avatar}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-6">
                  <button
                    type="submit"
                    className="p-1 focus:outline-none focus:shadow-none hover:text-blue-500 flex items-center justify-center text-gray-600 rounded-full"
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      className="h-6 w-6 ml-2 transform rotate-90 w-6 h-6 transition ease-out duration-300 hover:text-blue-500 text-gray-400"
                      onClick={() => setShowEmoji(false) || handleComment()}
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
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
