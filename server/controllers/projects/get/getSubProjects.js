const { prisma } = require("../../../prisma/prisma-client");

const getSubProjects = async (req, res) => {
  try {
    const { timerId } = req.params;

    if (timerId === undefined) {
      return res.status(400).json({ message: "Заполните обязательные поля." });
    }

    const subProjects = await prisma.project.findMany({
      where: {
        authorId: req.user.id,
        subProjects: {
          some: {
            timers: {
              some: {
                id: Number(timerId),
              },
            },
          },
        },
      },
      orderBy: {
        projectName: "desc",
      },
      include: {
        subProjects: {
          where: {
            timers: {
              some: {
                id: Number(timerId),
              },
            },
          },
        },
      },
    });

    return res.status(200).json(subProjects);
  } catch (error) {
    return res.status(500).json({ message: "Не удалось получить подзадачи." });
  }
};

module.exports = getSubProjects;
