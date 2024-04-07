const jwt = require("jsonwebtoken");

const updateCookies = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    let userId = jwt.verify(cookies.id, process.env.SECRET_KEY);
    if (userId) {
      res.cookie("id", jwt.sign(userId, process.env.SECRET_KEY), {
        httpOnly: true,
        maxAge: 172800000,
      });
      next();
    }
  } catch (error) {
    res.clearCookie(req.cookies.cookie);
    next();
  }
};

module.exports = updateCookies;
