const jwt = require("jsonwebtoken");

const updateCookies = async (req, res, next) => {
  const cookies = req.cookies;

  if (cookies.id) {
    let userId = jwt.verify(cookies.id, process.env.SECRET_KEY);
    if (userId) {
      res.cookie("id", jwt.sign(userId, process.env.SECRET_KEY), {
        httpOnly: true,
        maxAge: 172800000,
      });
    }
  }
  next();
};

module.exports = updateCookies;
