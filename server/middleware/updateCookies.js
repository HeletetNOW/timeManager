const updateCookies = async (req, res, next) => {
  const cookies = req.cookies;

  if (cookies) {
    res.cookie("id", cookies.id, { httpOnly: true, maxAge: 172800000 });
  }
  next();
};

module.exports = updateCookies;
