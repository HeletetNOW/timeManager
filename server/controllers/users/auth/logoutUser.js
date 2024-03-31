const logoutUser = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    if (cookies) {
      res.clearCookie("id");
    }

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    return res.status(500).json({ message: "Не удалось выйти." });
  }
};

module.exports = logoutUser;
