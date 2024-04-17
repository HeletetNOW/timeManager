const { prisma } = require("../../../prisma/prisma-client");
const updateSumTimeProjects = require("../updateSumTimeProjects");

const startTimer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Введите id таймера." });
    }

    const timer = await prisma.timer.update({
      where: {
        id: Number(id),
        pauseTimer: true,
      },

      data: {
        startTime: new Date(),
        pauseTimer: false,
      },
    });

    // await updateSumTimeProjects(id);

    return res.status(200).json(timer);
  } catch (error) {
    return res.status(500).json({ message: "Не удалось запустить таймер." });
  }
};

module.exports = startTimer;
