const { prisma } = require("../../../prisma/prisma-client");

const setTimerName = async (req, res) => {
  try {
    const { sumTime, id } = req.body;

    if (sumTime.typeof === Number || !id) {
      return res
        .status(400)
        .json({ message: "Заполните все обязательные поля." });
    }

    const updatedTimer = await prisma.timer.update({
      where: { id },
      data: { sumTime: Number(sumTime) },
    });

    return res.status(200).json(updatedTimer);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Не удалось изменить время таймера." });
  }
};

module.exports = setTimerName;
