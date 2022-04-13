// import { CreatePost } from "../../Components";
import {
  HomeIcon,
  ExploreIcon,
  NotificationIcon,
  MessageIcon,
  BookMarkIcon,
  ListIcon,
  ProfileIcon,
  MoreIcon,
  CreatePost,
} from "../../Components";
import { useSelector } from "react-redux";
export function Home() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="p-relative flex">
      <div className="bg-red-100 w-1/5 text-white h-12 h-auto mobile:hidden flex flex-col">
        <h1 className="text-3xl text-black font-bold text-center mt-20">
          TalkLine
        </h1>

        <div className="mt-5 px-2">
          <a
            href="#"
            className="group flex items-center px-2 py-2 text-base leading-6 font-semibold rounded-full bg-blue-800 text-blue-300"
          >
            <HomeIcon />
            Home
          </a>
          <a
            href="#"
            className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-semibold rounded-full hover:bg-blue-800 hover:text-blue-300"
          >
            <ExploreIcon />
            Explore
          </a>
          <a
            href="#"
            className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
          >
            <NotificationIcon />
            Notifications
          </a>
          <a
            href="#"
            className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
          >
            <MessageIcon />
            Messages
          </a>
          <a
            href="#"
            className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
          >
            <BookMarkIcon />
            Bookmarks
          </a>
          <a
            href="#"
            className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
          >
            <ListIcon />
            Lists
          </a>
          <a
            href="#"
            className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
          >
            <ProfileIcon />
            Profile
          </a>
          <a
            href="#"
            className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
          >
            <MoreIcon />
            More
          </a>
        </div>

        <div className="bottom flex-shrink-0 flex hover:bg-blue-00 rounded-full p-4 mt-12">
          <a href="#" className="flex-shrink-1 block">
            <div className="flex items-center w-full">
              <div>
                <img
                  className="inline-block h-10 w-10 rounded-full"
                  src={user.avatar}
                  alt=""
                />
              </div>
              <div className="ml-3 w-full">
                <p
                  style={{ width: "calc(90%)" }}
                  className="flex-shrink whitespace-nowrap leading-6 font-medium text-black text-ellipsis overflow-hidden"
                >
                  {user.name}
                </p>
                <p className="flex-wrap text-sm inline-block leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                  @ShonaDesign
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
      <CreatePost />
    </div>
  );
}
