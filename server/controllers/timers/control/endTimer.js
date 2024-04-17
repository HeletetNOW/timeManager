const { prisma } = require("../../../prisma/prisma-client");
const updateSumTimeSubProjects = require("../updateSumTimeSubProject");
const updateSumTimeProjects = require("../updateSumTimeProjects");

const endTimer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Введите id таймера." });
    }

    const oldTimer = await prisma.timer.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (oldTimer.pauseTimer === true) {
      return res.status(400).json({ message: "Таймер уже на паузе" });
    }

    const currentDate = new Date();

    const different = Math.abs(currentDate - oldTimer.startTime) / 1000;

    const timer = await prisma.timer.update({
      where: {
        id: Number(id),
      },
      data: {
        startTime: currentDate,
        sumTime: {
          increment: Math.round(different),
        },
        pauseTimer: true,
      },
    });

    await updateSumTimeSubProjects(id);
    await updateSumTimeProjects(id);

    return res.status(200).json(timer);
  } catch (error) {
    return res.status(500).json({ message: "Не удалось остановить таймер." });
  }
};

module.exports = endTimer;
