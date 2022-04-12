import jwt from "jsonwebtoken";

function checkAuth(req, res, next) {
  if (req.headers.token == "Bearer null") {
    res.json({ success: false, message: "Not Authenticated." });
  } else if (!req.headers.token) {
    res.json({ success: false, message: "No Token" });
  } else {
    let jwt_token = req.headers.token;
    jwt_token = jwt_token.split(" ")[1];
    jwt.verify(jwt_token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.json({
          statusCode: 401,
          success: false,
          message: "Token Expired",
        });
      } else {
        req.data = decoded;
        next();
      }
    });
  }
}

export default checkAuth;
