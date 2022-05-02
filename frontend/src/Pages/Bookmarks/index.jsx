import { BookMarkIcon, EachPost, Toast } from "../../Components";
import { bookmark, getBookmarks, likePost } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
export function Bookmark() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { data, loading, success, error } = useSelector(
    (state) => state.bookmark
  );
  useEffect(() => {
    dispatch(getBookmarks());
  }, []);
  const handleBookmark = async (id) => {
    setMessage("");
    const response = await dispatch(bookmark(id));
    if (!response) {
      dispatch({
        type: "REMOVE_FROM_BOOKMARK",
        payload: id,
      });
      return setMessage("Removed from Bookmark");
    }
  };
  const handleLike = async (id) => {
    setMessage("");
    const response = await dispatch(likePost(id));
    if (response) {
      dispatch({
        type: "UPDATE_BOOKMARK_LIKE",
        payload: { id: id, status: true },
      });
      return setMessage("You liked this post");
    } else {
      dispatch({
        type: "UPDATE_BOOKMARK_LIKE",
        payload: { id: id, status: false },
      });
      return setMessage("You unliked this post");
    }
  };
  return (
    <div className="w-2/3 bg-white block p-2 mobile:w-full mobile:py-0 min-h-screen">
      <div className="w-full p-4 bg-indigo-100 flex text-center items-center gap-2 rounded-2xl">
        <h2 className="text-2xl font-bold">BookMarks</h2>
        <BookMarkIcon className="h-8 w-8" />
      </div>
      {loading && (
        <div className="w-full flex flex-col justify-center text-center items-center mt-4">
          <div
            className="w-10 mb-10 h-10 rounded-full animate-spin
                   border-2 border-dashed border-black-600 border-t-black mr-1"
          ></div>
          <p>Getting your bookmarked posts.</p>
        </div>
      )}
      {!loading && data.length === 0 && (
        <div className="w-full h-40 border bg-indigo-200 rounded-xl flex justify-center text-center items-center mt-4">
          <h1 className="text-xl font-bold">
            You have not bookmarked any post yet.
          </h1>
        </div>
      )}

      {success &&
        data.length >= 1 &&
        data.map((eachPost) => {
          return (
            <EachPost
              key={eachPost._id}
              post={eachPost}
              handleLike={handleLike}
              handleBookmark={handleBookmark}
            />
          );
        })}
      {message && <Toast message={message} success={true} />}
    </div>
  );
}
