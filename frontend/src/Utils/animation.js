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

export { animation };
