import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  ExploreIcon,
  NotificationIcon,
  MessageIcon,
  BookMarkIcon,
  ListIcon,
  ProfileIcon,
  MoreIcon,
  Modal,
} from "../index";
import { userLogout } from "../../Redux/Actions";

export function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isSelectedLogout, setIsSelectedLogout] = useState(false);
  const ShowModalToLogout = () => (
    <Modal isOpen={isSelectedLogout}>
      <h1 className="text-xl mb-4 font-bold text-slate-500">Are you Sure?</h1>
      <button
        onClick={() => setIsSelectedLogout(!isSelectedLogout)}
        className="bg-indigo-500 px-4 py-2 w-20 rounded-md text-md text-white"
      >
        No
      </button>
      <button
        onClick={() => dispatch(userLogout())}
        className="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white"
      >
        Yes
      </button>
    </Modal>
  );
  return (
    <>
      <ShowModalToLogout />
      <div className="sticky left-0 top-0 w-1/5 text-white mobile:hidden flex flex-col ml-2 h-screen">
        <div className="pr-3 h-full flex flex-col justify-between">
          <div className="px-2">
            <h1
              className="text-3xl text-black font-bold text-center mt-20 mb-9 cursor-pointer"
              onClick={() => navigate("/")}
            >
              TalkLine
            </h1>
            <NavLink
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full text-black"
              activeclassname="active"
              to="/"
            >
              <HomeIcon />
              <p>Home</p>
            </NavLink>
            <NavLink
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full text-black"
              activeclassname="active"
              to="/explore"
            >
              <ExploreIcon />
              <p>Explore</p>
            </NavLink>
            <NavLink
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full text-black"
              activeclassname="active"
              to="/notification"
            >
              <NotificationIcon />
              <p>Notifications</p>
            </NavLink>
            <NavLink
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full text-black"
              activeclassname="active"
              to="/messages"
            >
              <MessageIcon />
              Messages
            </NavLink>
            <NavLink
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full text-black"
              activeclassname="active"
              to="/bookmarks"
            >
              <BookMarkIcon />
              Bookmarks
            </NavLink>
            <NavLink
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full text-black"
              activeclassname="active"
              to="/lists"
            >
              <ListIcon />
              Lists
            </NavLink>
            <NavLink
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full text-black"
              activeclassname="active"
              to="/profile"
            >
              <ProfileIcon />
              Profile
            </NavLink>
            <NavLink
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full text-black"
              activeclassname="active"
              to="/setting"
            >
              <MoreIcon />
              Settings
            </NavLink>
          </div>

          <div className="w-full flex p-4 mt-12">
            <div className="flex items-center w-full">
              <div className="max-w-14 max-h-14 min-w-max">
                <img
                  className="h-14 w-14 rounded-full"
                  src={user.avatar}
                  alt="userAvatar"
                />
              </div>
              <div
                style={{
                  width: "calc(90%)",
                }}
                className="w-full ml-3 overflow-hidden"
              >
                <p className="whitespace-nowrap overflow-hidden text-ellipsis leading-6 font-medium text-black">
                  {user.name}
                </p>
                <p className="flex-wrap text-sm inline-block leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                  <span
                    // onClick={handleLogout}
                    onClick={() => setIsSelectedLogout(!isSelectedLogout)}
                    className="pointer text-black hover:text-gray-400"
                  >
                    Logout?
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
