const jwt = require("jsonwebtoken");

const refresh = async (req, res) => {
  // try {
  const { refresh_token } = req.cookies;

  console.log(req.cookies);

  const userId = jwt.verify(refresh_token, process.env.refresh_secret);

  const access_secret = process.env.access_secret;

  res.cookie(
    "access_token",
    jwt.sign({ id: userId }, access_secret, { expiresIn: "15m" }),
    { httpOnly: true }
  );

  return res.status(200).json({
    message: "OK",
  });
  // } catch (error) {
  // return res.status(500).json({ message: "Не удалось обновить токен." });
  // }
};

module.exports = refresh;
