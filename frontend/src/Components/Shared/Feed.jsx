import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { bookmark, getFeed, likePost } from "../../Redux/Actions";
import { Toast, EachPost } from "..";
import InfiniteScroll from "react-infinite-scroll-component";

export function Feed() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { posts, loading, success } = useSelector((state) => state.feed);
  const myPosts = posts?.posts;
  const scroll = posts?.scroll;
  const [currentPage, setCurrentPage] = useState(1);
  const handleBookmark = async (id) => {
    setMessage("");
    const response = await dispatch(bookmark(id));
    if (response) {
      dispatch({
        type: "UPDATE_BOOKMARK_FEED",
        payload: { id: id, status: true },
      });
      return setMessage("Bookmarked this post");
    } else {
      dispatch({
        type: "UPDATE_BOOKMARK_FEED",
        payload: { id: id, status: false },
      });
      return setMessage("Unbookmarked this post");
    }
  };
  const handleLike = async (id) => {
    setMessage("");
    const response = await dispatch(likePost(id));
    if (response) {
      dispatch({
        type: "UPDATE_LIKE_FEED",
        payload: id,
      });
      return setMessage("You liked this post");
    } else {
      dispatch({
        type: "UPDATE_UNLIKE_FEED",
        payload: id,
      });
      return setMessage("You unliked this post");
    }
  };
  useEffect(() => {
    dispatch(getFeed(currentPage));
  }, [currentPage]);
  const loadMore = async () => {
    setCurrentPage((old) => old + 1);
  };
  return (
    <div className="w-full bg-white block overflow-scroll overflow-auto">
      {loading && currentPage === 1 ? (
        <div className="text-black flex-col w-full mt-5 flex align-center texts-center mobile:min-h-screen">
          <div
            className="w-10 mb-10 h-10 rounded-full animate-spin
                  border-2 border-dashed border-black-600 border-t-black mr-1"
          ></div>
          <p>Fetching fresh posts for you.</p>
        </div>
      ) : success && myPosts.length > 0 ? (
        <InfiniteScroll
          dataLength={myPosts.length}
          next={loadMore}
          hasMore={scroll?.count > scroll?.currentPage ? true : false}
          loader={
            <div className="text-black flex-col w-full mt-5 flex align-center texts-center">
              <div
                className="w-10 mb-10 h-10 rounded-full animate-spin
                  border-2 border-dashed border-black-600 border-t-black mr-1"
              ></div>
              <p>Loading More Content..</p>
            </div>
          }
        >
          {myPosts.map((eachPost) => {
            return (
              <EachPost
                key={eachPost._id}
                post={eachPost}
                handleBookmark={handleBookmark}
                handleLike={handleLike}
              />
            );
          })}
          {scroll?.currentPage === scroll?.count && (
            <div className="text-black flex-col w-full mt-5 flex align-center texts-center">
              <p>Caught up all the posts.</p>
            </div>
          )}
        </InfiniteScroll>
      ) : (
        <div className="w-full p-4 h-72 flex text-center items-center justify-center">
          <h2 className="font-bold">No Posts found. Explore Friends first.</h2>
        </div>
      )}
      {message && <Toast message={message} success={true} />}
    </div>
  );
}
