import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFeed } from "../../Redux/Actions";
import { EachPost } from "../EachPosts";
export function Feed() {
  const dispatch = useDispatch();
  const { posts, loading, success } = useSelector((state) => state.feed);
  useEffect(() => {
    dispatch(getFeed());
  }, []);

  return (
    <div className="w-full bg-white block">
      {loading ? (
        <div className="text-black flex-col w-full mt-5 flex align-center texts-center min-h-screen">
          <div
            className="w-10 mb-10 h-10 rounded-full animate-spin
                  border-2 border-dashed border-black-600 border-t-black mr-1"
          ></div>
          <p>Fetching fresh posts for you.</p>
        </div>
      ) : success && posts.length > 0 ? (
        posts.map((eachPost) => {
          return <EachPost key={eachPost._id} post={eachPost} />;
        })
      ) : (
        <div className="w-full p-4 h-72 flex text-center items-center justify-center">
          <h2 className="font-bold">No Posts found. Explore Friends first.</h2>
        </div>
      )}
    </div>
  );
}
