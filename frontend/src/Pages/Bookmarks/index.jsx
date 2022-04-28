import { BookMarkIcon, EachPost } from "../../Components";
import { getBookmarks } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
export function Bookmark() {
  const dispatch = useDispatch();
  const { data, loading, success, error } = useSelector(
    (state) => state.bookmark
  );
  useEffect(() => {
    dispatch(getBookmarks());
  }, []);
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
      {error && data.length === 0 && (
        <div className="w-full h-40 border bg-indigo-200 rounded-xl flex justify-center text-center items-center mt-4">
          <h1 className="text-xl font-bold">
            You have not bookmarked any post yet.
          </h1>
        </div>
      )}

      {success &&
        data.length >= 1 &&
        data.map((eachPost) => {
          return <EachPost key={eachPost._id} post={eachPost} />;
        })}
    </div>
  );
}
