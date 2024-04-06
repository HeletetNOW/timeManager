const { prisma } = require("../../../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Заполните все обязательные поля" });
    }

    const user = await prisma.user.findFirst({ where: { email } });

    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password));

    res.cookie("id", jwt.sign(user.id, process.env.SECRET_KEY));

    if (user && isPasswordCorrect) {
      return res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
      });
    } else {
      return res.status(400).json({ message: "Неверный логин или пароль." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Не удалось войти." });
  }
};

module.exports = login;
