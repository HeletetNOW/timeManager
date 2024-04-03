const { prisma } = require("../../prisma/prisma-client");

const deleteTimer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Введите id таймера." });
    }

    await prisma.timer.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    return res.status(500).json({ message: "Не удалось удалить таймер." });
  }
};

module.exports = deleteTimer;
