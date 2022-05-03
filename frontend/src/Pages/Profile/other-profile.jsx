import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadUserProfile } from "../../Redux/Actions";
import { JoinedIcon, ProfileButton } from "../../Components";
import { initialTabs as tabs } from "../../Components/Shared/OtherProfile-tabs";
import { AnimatePresence, motion } from "framer-motion";

import moment from "moment";
export function UserProfile() {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const dispatch = useDispatch();
  const { success, error, user, loading, message } = useSelector(
    (state) => state.profile
  );
  useEffect(() => {
    dispatch(loadUserProfile(id));
    return () => {
      dispatch({ type: "CLEAR_PROFILE" });
    };
  }, [id]);
  return (
    <div className="w-2/3 bg-white block py-10 mobile:w-full mobile:py-0">
      <div className="mx-auto">
        <div className="w-full">
          <div className="w-full bg-blue-600 h-48 rounded-t-lg">
            <img
              src={user.cover}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="absolute -mt-20 ml-5">
            <img
              src={user.avatar}
              className={`bg-transparent border border-gray-300 h-36 w-40 rounded-lg shadow-md border-b border-primary ${
                (loading && "pulses bg-gray-400", error && "bg-gray-400")
              }`}
              alt=""
            />
          </div>
        </div>
        <div className="bg-primary border border-primary rounded-b-lg p-5 pt-20 flex flex-col">
          {loading ? (
            <div className="py-5 pulses break-all bbcode">
              <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-44"></div>
              <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-full h-40"></div>
            </div>
          ) : success ? (
            <>
              <h1 className="font-bold text-2xl">{user.name}</h1>
              <p className="text-gray-600 font-semibold">{user.bio}</p>
              <p className="flex text-center items-center text-gray-500">
                <JoinedIcon />
                Joined {moment(user.createdAt).format("LL")}
              </p>
              <ProfileButton user={user} />
              {user.isRequested.isFriend && (
                <div className="window">
                  <div>
                    <ul className="flex">
                      {tabs.map((item) => (
                        <li
                          key={item.label}
                          className={
                            item === selectedTab ? "selected flex" : "flex"
                          }
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
              )}
            </>
          ) : (
            error && (
              <>
                <p className="text-red-600 text-2xl font-bold">
                  User Not Found
                </p>
                <p>{message}</p>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}
