import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Signup, Login, Error } from "./Pages";
import {
  Navbar,
  HomeComponent,
  ProfileComponent,
  UserProfileComponent,
  NotificationComponent,
  ExploreComponent,
  MessageComponent,
  PostComponent,
  SettingComponent,
  BookMarkComponent,
} from "./Components";
import { GuestRoutes, ProtectedRoutes } from "./Utils/routes";
import { verifyUser } from "./Redux/Actions";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token") ? true : false;
  const { loading, isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (token && !isAuthenticated) {
      dispatch(verifyUser());
    }
  }, [dispatch, token]);
  if (loading) {
    return (
      <div className="text-black flex-col w-full h-screen flex justify-center align-center texts-center bg-slate-50">
        <div
          className="w-10 mb-10 h-10 rounded-full animate-spin
                border-2 border-dashed border-black-600 border-t-black mr-1"
        ></div>
        <p>Logging you in....</p>
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomeComponent />} />
          <Route path="*" element={<Error />} />
          <Route path="profile" element={<ProfileComponent />} />
          <Route path="/user/:id" element={<UserProfileComponent />} />
          <Route path="notification" element={<NotificationComponent />} />
          <Route path="explore" element={<ExploreComponent />} />
          <Route path="messages" element={<MessageComponent />} />
          <Route path="post/:postId" element={<PostComponent />} />
          <Route path="setting" element={<SettingComponent />} />
          <Route path="bookmarks" element={<BookMarkComponent />} />
        </Route>
        <Route element={<GuestRoutes />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
