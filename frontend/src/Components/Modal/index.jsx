import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { animationForModal } from "../../Utils/animation";
export function Modal(props) {
  const [show, setShow] = useState(props.isOpen);
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  });
  return (
    show && (
      <AnimatePresence>
        <motion.div
          style={{ height: "calc(100vh)" }}
          className="z-50 backdrop-blur-sm modal overscroll-auto bg-slate-800 bg-opacity-50 flex justify-center items-center fixed w-full top-0 left-0"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={animationForModal}
            className="bg-white px-16 py-14 rounded-md text-center"
          >
            <div>{props.children}</div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  );
}
