const bcrypt = require("bcrypt");

const authMiddleware = async (req, res, next) => {
  try {
    const { old_password } = req.body;

    if (!old_password) {
      return res.status(401).json({ message: "Введите старый пароль." });
    }

    const decoded = bcrypt.compare(old_password, req.user.password);

    if (!decoded) {
      return res.status(404).json({ message: "Неверный пароль." });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Ошибка при проверке пароля." });
  }
};

module.exports = authMiddleware;
