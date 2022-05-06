import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, PencilIcon } from "../../Components";
import { loadMyProfile, updateBio } from "../../Redux/Actions";
import { AnimatePresence, motion } from "framer-motion";
import { initialTabs as tabs } from "../../Components/Shared/Profile-tabs";
import { CreatePostProfile } from "../../Components/Shared/Create-post-profile";
export function Profile() {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const { user } = useSelector((state) => state.auth);
  const [isOpenToChangeBio, setIsOpenToChangeBio] = useState(false);
  const ModalToUpdateBio = () => {
    const [bio, setBio] = useState("");
    return (
      <Modal isOpen={isOpenToChangeBio}>
        <div className="w-full flex flex-col">
          <h2 className="font-bold text-lg">Are you sure to Change Bio?</h2>
          <input
            className="p-2 border-2 mt-2  outline-none focus:border-indigo-600"
            type="text"
            placeholder="Enter your Bio"
            onChange={(event) => setBio(event.target.value)}
          />
          <div className="mt-10 w-full flex justify-between">
            <button
              onClick={() => setIsOpenToChangeBio(false)}
              className="bg-indigo-500 w-2/5 p-2 rounded-md text-md text-white"
            >
              No
            </button>
            <button
              onClick={() => {
                dispatch(updateBio(bio));
                setIsOpenToChangeBio(false);
              }}
              className="bg-red-500 p-2 w-2/5 rounded-md text-md text-white"
            >
              Update
            </button>
          </div>
        </div>
      </Modal>
    );
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(loadMyProfile());
  }, []);
  return (
    <div className="w-2/3 bg-white blockW mobile:w-full">
      <ModalToUpdateBio />
      <div className="mx-auto">
        <div className="w-full">
          <div className="w-full bg-blue-600 h-48 rounded-t-lg">
            <img
              src={user.cover}
              alt=""
              className="w-full max-h-full object-cover"
            />
          </div>
          <div className="absolute -mt-20 ml-5">
            <img
              src={user.avatar}
              className="bg-gray-100 border border-gray-300 h-36 w-40 rounded-lg shadow-md border-b border-primary"
              alt="userAvatar"
            />
          </div>
        </div>
        <div className="bg-primary border border-primary rounded-b-lg p-5 pt-20 flex flex-col">
          <h1 className="font-bold text-2xl">{user.name}</h1>
          <div className="flex text-center items-center">
            <p className="text-gray-600 font-semibold">{user.bio}</p>
            <PencilIcon
              onClick={() => setIsOpenToChangeBio(!isOpenToChangeBio)}
            />
          </div>
          <CreatePostProfile />
          <div className="window">
            <div>
              <ul className="flex">
                {tabs.map((item) => (
                  <li
                    key={item.label}
                    className={item === selectedTab ? "selected flex" : "flex"}
                    onClick={() => setSelectedTab(item)}
                  >
                    {`${item.icon} ${item.label}`}
                  </li>
                ))}
              </ul>
            </div>
            <main>
              <AnimatePresence exitBeforeEnter>
                <motion.div
                  key={selectedTab ? selectedTab.label : "empty"}
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.15 }}
                >
                  {selectedTab ? selectedTab.component : "😋"}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
