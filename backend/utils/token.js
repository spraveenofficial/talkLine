import jwt from "jsonwebtoken";
const generateAuthToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

export { generateAuthToken };
