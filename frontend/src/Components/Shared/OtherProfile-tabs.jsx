import { AnimateSharedLayout, motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EachPost, Toast } from "..";
import { bookmark, likePost } from "../../Redux/Actions";
const Posts = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { user } = useSelector((state) => state.profile);
  const posts = user.posts;
  const handleLike = async (id) => {
    setMessage("");
    const response = await dispatch(likePost(id));
    if (response) {
      dispatch({
        type: "UPDATE_PROFILE_LIKE",
        payload: { id: id, status: true },
      });
      return setMessage("You liked this post");
    } else {
      dispatch({
        type: "UPDATE_PROFILE_LIKE",
        payload: { id: id, status: false },
      });
      return setMessage("You unliked this post");
    }
  };
  const handleBookmark = async (id) => {
    setMessage("");
    const response = await dispatch(bookmark(id));
    if (response) {
      dispatch({
        type: "UPDATE_PROFILE_BOOKMARK",
        payload: { id: id, status: true },
      });
      return setMessage("Bookmarked this post");
    } else {
      dispatch({
        type: "UPDATE_PROFILE_BOOKMARK",
        payload: { id: id, status: false },
      });
      return setMessage("Unbookmarked this post");
    }
  };
  return (
    <AnimateSharedLayout>
      {posts.length > 0 ? (
        <div>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <EachPost
                key={post._id}
                post={post}
                handleLike={handleLike}
                handleBookmark={handleBookmark}
              />
            ))}
          </div>
          {message && <Toast message={message} success={true} />}
        </div>
      ) : (
        <div className="text-black flex-col w-full flex justify-center align-center texts-center">
          <div className="text-3xl font-bold">No Posts Yet</div>
        </div>
      )}
    </AnimateSharedLayout>
  );
};

const About = () => {
  return (
    <AnimateSharedLayout>
      <div className="py-5">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2 p-2">
            <h1>About Section</h1>
          </div>
        </div>
      </div>
    </AnimateSharedLayout>
  );
};

export const allItems = [
  { icon: "⏰", label: "Posts", component: <Posts /> },
  {
    icon: "🤝",
    label: "About",
    component: <About />,
  },
];
const [Recent, Settings] = allItems;
export const initialTabs = [Recent, Settings];
