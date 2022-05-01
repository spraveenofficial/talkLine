import "./style.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [deviceType, setDeviceType] = useState("desktop");
  useEffect(() => {
    updateDeviceType(window.innerWidth);
  });
  useEffect(() => {
    window.addEventListener("resize", () => {
      updateDeviceType(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        updateDeviceType(window.innerWidth);
      });
    };
  });
  const [showNav, setNav] = useState(false);
  const hideNav = () => {
    setNav(false);
  };
  useEffect(() => {
    if (showNav === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  });
  const updateDeviceType = (width) => {
    if (width >= 900) {
      setDeviceType("desktop");
      hideNav();
      return;
    }
    setDeviceType("mobile");
  };
  return (
    <div className="none">
      {deviceType === "desktop" ? (
        <div className="navbar">
          <div className="navbar-container">
            <Link to="/">
              <div className="navbar-logo">
                <span className="text-3xl ">TalkLine</span>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div className="mobile-menu">
          <div className="navbar">
            <div className="navbar-container">
              <Link to="/">
                <div className="navbar-logo">
                  <span className="text-3xl text-black font-bold">TalkLine</span>
                </div>
              </Link>
              <div className="navbar-items">
                <svg
                  className="pointer"
                  onClick={() => {
                    setNav(!showNav);
                  }}
                  width="30px"
                  height="30px"
                  fill="#00000"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 13H3c-.6 0-1-.4-1-1s.4-1 1-1h18c.6 0 1 .4 1 1s-.4 1-1 1zm0-8H3c-.6 0-1-.4-1-1s.4-1 1-1h18c.6 0 1 .4 1 1s-.4 1-1 1zm0 16H3c-.6 0-1-.4-1-1s.4-1 1-1h18c.6 0 1 .4 1 1s-.4 1-1 1z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
      <AnimatePresence>
        {showNav ? (
          <motion.div
            className="mobile-nav-container"
            initial={{
              x: "100%",
            }}
            animate={{
              x: "calc(100vw - 50%)",
            }}
            exit={{
              x: "100%",
            }}
            transition={{
              type: "tween",
              // ease: [0.87, 0.07, 0.37, 0.97],
              duration: 0.3,
            }}
          >
            <motion.div className="mobnavitems">
              <svg
                onClick={() => {
                  setNav(!showNav);
                }}
                className="pointer"
                fill="white"
                height="20px"
                width="20px"
                viewBox="0 0 24 24"
              >
                <path d="M15.04 12L24 2.96 21.04 0 12 8.96 3.04 0 0 2.96 9.04 12 0 20.96 3.04 24 12 14.96 21.04 24 24 20.96z"></path>
              </svg>
              <div className="mobile-nav-items">
                <p
                  onClick={() => navigate("/categories/men") || setNav(!setNav)}
                >
                  Mens
                </p>
                <p
                  onClick={() =>
                    navigate("/categories/women") || setNav(!setNav)
                  }
                >
                  Women
                </p>
                <p
                  onClick={() =>
                    navigate("/categories/kids") || setNav(!setNav)
                  }
                >
                  Kids
                </p>
                <p
                  onClick={() =>
                    navigate("/categories/footwear") || setNav(!setNav)
                  }
                >
                  Footwear
                </p>
                <p
                  onClick={() =>
                    navigate("/categories/gadgets") || setNav(!setNav)
                  }
                >
                  Gadgets
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export { Navbar };
