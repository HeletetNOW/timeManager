const { prisma } = require("../../../prisma/prisma-client");
const updateSumTimeProjects = require("../updateSumTimeProjects.js");
const updateSumTimeSubProjects = require("../updateSumTimeSubProject.js");

const addSubProjectToTimer = async (req, res) => {
  try {
    const { id, subProjectId } = req.body;

    if (!id || !subProjectId) {
      return res
        .status(400)
        .json({ message: "Заполните все обязательные поля." });
    }

    const addedSubProjects = await prisma.timer.update({
      where: { id },
      data: {
        subProjects: {
          connect: { id: subProjectId },
        },
      },
      include: {
        subProjects: true,
        tags: true,
      },
    });

    await updateSumTimeSubProjects(id);
    await updateSumTimeProjects(id);

    return res.status(200).json(addedSubProjects);
  } catch (error) {
    return res.status(500).json({ message: "Не удалось добавить подзадачи." });
  }
};

module.exports = addSubProjectToTimer;
