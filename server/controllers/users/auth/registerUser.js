const { prisma } = require("../../../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, password, name, surname } = req.body;

    if (!email || !name || !surname || !password) {
      return res
        .status(400)
        .json({ message: "Заполните все обязательные поля" });
    }

    const existingUser = await prisma.user.findFirst({ where: { email } });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Данный пользователь уже зарегестрирован" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        surname,
        password: hashedPassword,
      },
    });

    res.cookie("id", jwt.sign(user.id, process.env.SECRET_KEY), {
      httpOnly: true,
      maxAge: 172800000,
    });

    if (user) {
      return res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
      });
    } else {
      return res
        .status(500)
        .json({ message: "Не удалось создать пользователя." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Не удалось создать пользователя." });
  }
};

module.exports = register;
