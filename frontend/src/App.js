import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/index";
import { Navbar } from "./Components/index";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
