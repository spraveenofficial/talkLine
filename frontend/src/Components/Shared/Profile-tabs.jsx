import { AnimateSharedLayout, motion } from "framer-motion";
const RecentQuiz = () => {
  return (
    <div className="py-5 pulses break-all bbcode">
      <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-44"></div>
      <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-full h-40"></div>
    </div>
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
  { icon: "⏰", label: "Posts", component: <RecentQuiz /> },
  { icon: "⚙️", label: "Friends", component: <UserSettings /> },
];
const [Recent, Settings] = allItems;
export const initialTabs = [Recent, Settings];
