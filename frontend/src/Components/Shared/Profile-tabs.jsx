import { AnimateSharedLayout, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { EachPost } from "..";
const MyPosts = () => {
  const { user, loading, success } = useSelector((state) => state.myprofile);
  if (loading) {
    return (
      <AnimateSharedLayout>
        <div className="py-5 pulses break-all bbcode">
          <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-44"></div>
          <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-full h-40"></div>
        </div>
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
              <EachPost key={post._id} post={post} />
            ))}
          </div>
        </div>
      </AnimateSharedLayout>
    )
  );
};
const UserSettings = () => {
  return (
    <div className="text-black flex-col w-full flex justify-center align-center texts-center">
      <div
        className="w-10 mb-10 h-10 rounded-full animate-spin
                border-2 border-dashed border-black-600 border-t-black mr-1"
      ></div>
      <p>Fetching Friends</p>
    </div>
  );
};

export const allItems = [
  { icon: "⏰", label: "Posts", component: <MyPosts /> },
  { icon: "⚙️", label: "Friends", component: <UserSettings /> },
];
const [Recent, Settings] = allItems;
export const initialTabs = [Recent, Settings];
