const { isTokenValid } = require("../utils/jwt");
const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ msg: "Tidak ada token" });
  }

  const accessToken = authHeader.split(" ")[1];
  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload;
      return next();
    }
    next();
  } catch (error) {
    res.status(401).json({ msg: "Authentikasi tidak valid" });
  }
};

module.exports = {
  authenticateUser,
};
