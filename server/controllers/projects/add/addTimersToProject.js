const { prisma } = require("../../../prisma/prisma-client");

const addTimersToProject = async (req, res) => {
  try {
    const { id, timers } = req.body;

    if (!id || !timers) {
      return res
        .status(400)
        .json({ message: "Заполните все обязательные поля." });
    }

    const addedTimers = await prisma.project.update({
      where: { id },
      data: {
        timers: {
          connect: timers.map((id) => ({
            id,
          })),
        },
      },
      include: {
        timers: true,
        tags: true,
      },
    });

    return res.status(200).json(addedTimers);
  } catch (error) {
    return res.status(500).json({ message: "Не удалось добавить проекты." });
  }
};

module.exports = addTimersToProject;
