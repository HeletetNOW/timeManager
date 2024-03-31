const { prisma } = require("../../prisma/prisma-client");

const getTimers = async (req, res) => {
  try {
    const { date } = req.body;

    let dayToSearch = new Date(date);
    dayToSearch.setHours(0, 0, 0, 0);

    const nextDay = new Date(dayToSearch);
    nextDay.setDate(dayToSearch.getDate() + 1);

    const timers = await prisma.timer.findMany({
      where: {
        authorId: req.user.id,
        addTimer: {
          gte: dayToSearch,
          lt: nextDay,
        },
      },
      orderBy: {
        timerName: "desc",
      },
      include: {
        tags: true,
        projects: true,
      },
    });

    const result = timers.map((timer) => {
      startTime = timer.pauseTimer ? timer.startTime : new Date();
      sumTime = timer.pauseTimer
        ? timer.sumTime
        : timer.sumTime +
          Math.floor(
            (new Date().getTime() - new Date(timer.startTime).getTime()) / 1000
          );
      return { ...timer, startTime, sumTime };
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Не удалось получить таймеры." });
  }
};

module.exports = getTimers;
