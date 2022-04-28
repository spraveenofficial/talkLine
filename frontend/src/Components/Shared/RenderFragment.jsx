import { Sidebar } from "..";
import { CreatePost, RightSidebar } from "..";
import {
  Explore,
  Home,
  Message,
  Notification,
  Profile,
  UserProfile,
  Post,
  Setting,
  Bookmark,
} from "../../Pages";
const HomeComponent = () => (
  <div className="flex relative h-full mobile:flex-col">
    <Sidebar />
    <CreatePost />
    <RightSidebar />
  </div>
);

const ProfileComponent = () => (
  <div className="flex relative h-full mobile:flex-col">
    <Sidebar />
    <Profile />
    <RightSidebar />
  </div>
);

const UserProfileComponent = () => (
  <div className="flex relative h-full mobile:flex-col">
    <Sidebar />
    <UserProfile />
    <RightSidebar />
  </div>
);

const NotificationComponent = () => (
  <div className="flex relative h-full mobile:flex-col">
    <Sidebar />
    <Notification />
    <RightSidebar />
  </div>
);

const ExploreComponent = () => (
  <div className="flex relative h-full mobile:flex-col">
    <Sidebar />
    <Explore />
    <RightSidebar />
  </div>
);

const MessageComponent = () => (
  <div className="flex relative h-full mobile:flex-col">
    <Sidebar />
    <Message />
    <RightSidebar />
  </div>
);

const PostComponent = () => (
  <div className="flex relative h-full mobile:flex-col">
    <Sidebar />
    <Post />
    <RightSidebar />
  </div>
);

const SettingComponent = () => (
  <div className="flex relative h-full mobile:flex-col">
    <Sidebar />
    <Setting />
    <RightSidebar />
  </div>
);

const BookMarkComponent = () => (
  <div className="flex relative h-full mobile:flex-col">
    <Sidebar />
    <Bookmark />
    <RightSidebar />
  </div>
);
export {
  HomeComponent,
  ProfileComponent,
  UserProfileComponent,
  NotificationComponent,
  ExploreComponent,
  MessageComponent,
  PostComponent,
  SettingComponent,
  BookMarkComponent,
};
