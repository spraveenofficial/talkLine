import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFeed } from "../../Redux/Actions";
import { EachPost } from "../EachPosts";
export function Feed() {
  const dispatch = useDispatch();
  const { posts, loading, success } = useSelector((state) => state.feed);
  console.log(posts);
  useEffect(() => {
    dispatch(getFeed());
  }, []);
  
  return (
    <div className="w-full bg-white block">
      {loading ? (
        <div className="text-black flex-col w-full mt-5 flex justify-center align-center texts-center bg-slate-50">
          <div
            className="w-10 mb-10 h-10 rounded-full animate-spin
                  border-2 border-dashed border-black-600 border-t-black mr-1"
          ></div>
          <p>Fetching fresh posts for you.</p>
        </div>
      ) : success && posts.length > 0 ? (
        posts.map((eachPost) => {
          return <EachPost key={eachPost.id} post={eachPost} />;
        })
      ) : (
        <div className="w-full p-4 bg-indigo-100 flex text-center items-center gap-2 rounded-2xl">
          <h2 className="text-2xl font-bold">Posts</h2>
        </div>
      )}
    </div>
  );
}
