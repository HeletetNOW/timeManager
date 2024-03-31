const { prisma } = require("../../../prisma/prisma-client");

const addProjectsToTimer = async (req, res) => {
  try {
    const { id, projectId } = req.body;

    if (!id || !projectId) {
      return res
        .status(400)
        .json({ message: "Заполните все обязательные поля." });
    }

    const addedProjects = await prisma.timer.update({
      where: { id },
      data: {
        projects: {
          connect: { id: projectId },
        },
      },
      include: {
        projects: true,
        tags: true,
      },
    });

    return res.status(200).json(addedProjects);
  } catch (error) {
    return res.status(500).json({ message: "Не удалось добавить проекты." });
  }
};

module.exports = addProjectsToTimer;
