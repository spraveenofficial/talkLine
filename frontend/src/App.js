import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Signup, Login } from "./Pages/index";
import { Navbar } from "./Components/index";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
