const { prisma } = require("../../../prisma/prisma-client");
const bcrypt = require("bcrypt");

const changePassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Введите новый пароль." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedPassword },
    });

    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    return res.status(500).json({ message: "Не удалось изменить пароль." });
  }
};

module.exports = changePassword;
