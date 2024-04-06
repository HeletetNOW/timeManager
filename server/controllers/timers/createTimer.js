const { prisma } = require("../../prisma/prisma-client");

const createTimer = async (req, res) => {
  try {
    const { timerName, tags = [] } = req.body;

    if (!timerName) {
      return res.status(400).json({ message: "Введите название таймера." });
    }

    const timer = await prisma.timer.create({
      data: {
        timerName,
        addTimer: new Date(),
        author: {
          connect: { id: req.user.id },
        },
        tags: {
          connect: tags.map((tag) => ({
            id: tag.id,
          })),
        },
        startTime: new Date(),
        pauseTimer: true,
        sumTime: 0,
      },
    });

    return res.status(200).json(timer);
  } catch (error) {
    return res.status(500).json({ message: "Не удалось создать таймер." });
  }
};

module.exports = createTimer;
