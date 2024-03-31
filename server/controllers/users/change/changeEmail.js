const { prisma } = require("../../../prisma/prisma-client");

const changeEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Введите новый email." });
    }

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { email },
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

module.exports = changeEmail;
