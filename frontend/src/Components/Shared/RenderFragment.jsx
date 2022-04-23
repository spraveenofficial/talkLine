import { Sidebar } from "..";
import { CreatePost } from "../CreatePost";
import {
  Explore,
  Home,
  Message,
  Notification,
  Profile,
  UserProfile,
  Post,
  Setting,
} from "../../Pages";
const HomeComponent = () => (
  <div className="flex relative h-full mobile:flex-col">
    <Sidebar />
    <CreatePost />
    <Home />
  </div>
);

const ProfileComponent = () => (
  <div className="flex relative h-full mobile:flex-col">
    <Sidebar />
    <Profile />
    <Home />
  </div>
);

const UserProfileComponent = () => (
  <div className="flex relative h-full mobile:flex-col">
    <Sidebar />
    <UserProfile />
    <Home />
  </div>
);

const NotificationComponent = () => (
  <div className="flex relative h-full mobile:flex-col">
    <Sidebar />
    <Notification />
    <Home />
  </div>
);

const ExploreComponent = () => (
  <div className="flex relative h-full mobile:flex-col">
    <Sidebar />
    <Explore />
    <Home />
  </div>
);

const MessageComponent = () => (
  <div className="flex relative h-full mobile:flex-col">
    <Sidebar />
    <Message />
    <Home />
  </div>
);

const PostComponent = () => (
  <div className="flex relative h-full mobile:flex-col">
    <Sidebar />
    <Post />
    <Home />
  </div>
);

const SettingComponent = () => (
  <div className="flex relative h-full mobile:flex-col">
    <Sidebar />
    <Setting />
    <Home />
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
};
