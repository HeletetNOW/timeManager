const { prisma } = require("../../../prisma/prisma-client");

const changeSurName = async (req, res) => {
  try {
    const { surname } = req.body;

    if (!surname) {
      return res.status(400).json({ message: "Введите новую фамилию." });
    }

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { surname },
    });

    return res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
    });
  } catch (error) {
    return res.status(500).json({ message: "Не удалось изменить фамилию." });
  }
};

module.exports = changeSurName;
