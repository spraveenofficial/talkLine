import { AnimateSharedLayout, motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EachPost, Toast } from "..";
import { deletePost, unfriendUser } from "../../Redux/Actions";
const MyPosts = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { user, loading, success } = useSelector((state) => state.myprofile);

  const handleDeletePost = async (id) => {
    setMessage("");
    const response = await deletePost(id);
    if (response) {
      setMessage("Post Deleted");
      return dispatch({
        type: "DELETE_POST_PROFILE",
        payload: id,
      });
    }
    return setMessage("Post Not Deleted");
  };
  if (loading) {
    return (
      <AnimateSharedLayout>
        <motion.div className="py-5 pulses break-all bbcode">
          <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-44"></div>
          <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-full h-40"></div>
        </motion.div>
      </AnimateSharedLayout>
    );
  }
  if (!loading && !success && user.posts.length === 0) {
    return (
      <div className="text-black flex-col w-full flex justify-center align-center texts-center">
        <div className="text-3xl font-bold">No Posts Yet</div>
      </div>
    );
  }
  return (
    !loading &&
    success &&
    user.posts.length > 0 && (
      <AnimateSharedLayout>
        <div className="py-5">
          <div className="flex flex-wrap">
            {user.posts.map((post) => (
              <EachPost
                key={post._id}
                post={post}
                handleDeletePost={handleDeletePost}
                superAccess={true}
              />
            ))}
          </div>
        </div>
        {message && <Toast message={message} success={true} />}
      </AnimateSharedLayout>
    )
  );
};
const MyFriends = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleUnfriend = (id) => {
    dispatch(unfriendUser(id));
  };
  const Cards = ({ user }) => {
    const navigate = useNavigate();
    const handleNavigate = (id) => {
      navigate(`/user/${id}`);
    };
    return (
      <div className="w-max mobile:w-full mb-2 lg:w-full desktop:w-full">
        <div className="cursor-pointer card p-2 border hover:shadow-none relative flex flex-col shadow-lg">
          <div
            onClick={() => handleNavigate(user.id)}
            className="profile w-72 flex m-3 ml-4 text-white"
          >
            <img
              className="w-20 h-20 bg-white rounded-full"
              src={user.avatar}
              alt=""
            />
            <div className="ml-3 flex flex-col overflow-hidden">
              <div className="name font-bold break-words text-black whitespace-nowrap overflow-hidden text-ellipsis">
                {user.name}
              </div>
              <p className="text-black font-sm whitespace-nowrap overflow-hidden text-ellipsis">
                {user.bio}
              </p>
            </div>
          </div>
          <div className="buttons flex absolute -bottom-2 font-bold right-0 text-xs text-gray-500 space-x-0 my-3.5 mr-3">
            <button
              onClick={() => handleUnfriend(user.id)}
              className="bg-indigo-500 text-white p-2 font-semibold rounded-xl mt-2"
            >
              Unfriend
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <AnimateSharedLayout>
      <div className="mt-2">
        {user.friends.length > 0 ? (
          <div className="flex flex-wrap justify-between">
            {user.friends.map((friend) => (
              <Cards key={friend._id} user={friend} />
            ))}
          </div>
        ) : (
          <div className="text-black flex-col w-full flex justify-center align-center texts-center">
            <div className="text-3xl font-bold">No Friends Yet</div>
          </div>
        )}
      </div>
    </AnimateSharedLayout>
  );
};

export const allItems = [
  { icon: "⏰", label: "My Posts", component: <MyPosts /> },
  {
    icon: "🤝",
    label: "My Friends",
    component: <MyFriends />,
  },
];
const [Recent, Settings] = allItems;
export const initialTabs = [Recent, Settings];
