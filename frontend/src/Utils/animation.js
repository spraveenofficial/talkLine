const animation = {
  hidden: {
    x: "-10%",
    opacity: 0,
  },
  show: {
    x: "-0%",
    opacity: 1,
    transition: {
      duration: 1,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const animationForModal = {
  hidden: {
    y: "-100vh",
    opacity: 0,
    transform: "scale(0) rotateX(-360deg)",
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.2,
      type: "spring",
      damping: 15,
      stiffness: 500,
    },
  },
  exit: {
    y: "-100vh",
    opacity: 0,
  },
};
const categoryVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
      type: "tween",
      staggerChildren: 0.2,
    },
  },
};
const categoryItemVariants = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};


export { categoryVariant, categoryItemVariants, animation, animationForModal };
