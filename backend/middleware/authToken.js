const jwt = require("jsonwebtoken");

function authToken(req, res, next) {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ message: "Unauthorized", success: false, error: true });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded._id;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid token", success: false, error: true });
  }
}

module.exports = authToken;
