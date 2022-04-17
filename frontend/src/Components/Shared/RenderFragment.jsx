import { Sidebar } from "..";
import { CreatePost } from "../CreatePost";
import { Home, Notification, Profile, UserProfile } from "../../Pages";
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

export { HomeComponent, ProfileComponent, UserProfileComponent, NotificationComponent };
