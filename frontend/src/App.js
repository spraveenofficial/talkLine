import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Signup, Login } from "./Pages/index";
import { Navbar } from "./Components/index";
import { GuestRoutes, ProtectedRoutes } from "./Utils/routes";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
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
