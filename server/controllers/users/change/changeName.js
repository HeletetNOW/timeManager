const { prisma } = require("../../../prisma/prisma-client");

const changeName = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Введите новое имя." });
    }

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { name },
    });

    return res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
    });
  } catch (error) {
    return res.status(500).json({ message: "Не удалось изменить имя." });
  }
};

module.exports = changeName;
