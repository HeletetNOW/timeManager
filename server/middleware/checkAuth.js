const { prisma } = require("../prisma/prisma-client");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const { id } = req.cookies;

    if (!id) {
      return res.status(401).json({ message: "Требуется аутентификация." });
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(jwt.verify(id, process.env.SECRET_KEY)) },
    });

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Недействительный токен." });
  }
};

module.exports = authMiddleware;
