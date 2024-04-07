const { prisma } = require("../../../prisma/prisma-client");

const setTimerName = async (req, res) => {
  try {
    const { timerName, id } = req.body;

    if (!timerName || !id) {
      return res
        .status(400)
        .json({ message: "Заполните все обязательные поля." });
    }

    const updatedTimer = await prisma.timer.update({
      where: { id },
      data: { timerName },
    });

    return res.status(200).json(updatedTimer);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Не удалось изменить имя таймера." });
  }
};

module.exports = setTimerName;
