const { prisma } = require("../../prisma/prisma-client");

const createTimer = async (req, res) => {
  try {
    const { timerName, tags = [], date = new Date() } = req.body;

    let dayToCreate = new Date(date);
    dayToCreate.setHours(0, 0, 0, 0);

    if (!timerName) {
      return res.status(400).json({ message: "Введите название таймера." });
    }

    const timer = await prisma.timer.create({
      data: {
        timerName,
        addTimer: dayToCreate,
        author: {
          connect: { id: req.user.id },
        },
        tags: {
          connect: tags.map((tag) => ({
            id: tag,
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
