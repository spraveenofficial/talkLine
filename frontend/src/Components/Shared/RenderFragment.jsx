import { Sidebar } from "..";
import { CreatePost } from "../CreatePost";
import { Home, Profile, UserProfile } from "../../Pages";
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

export { HomeComponent, ProfileComponent, UserProfileComponent };
