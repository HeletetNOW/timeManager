const { prisma } = require("../../../prisma/prisma-client");
const updateSumTimeProjects = require("../add/updateSumTimeProjects");

const removeSubProjectFromTimer = async (req, res) => {
  try {
    const { id, subProjectId } = req.body;

    if (!id || !subProjectId) {
      return res
        .status(400)
        .json({ message: "Заполните все обязательные поля." });
    }

    const removedProject = await prisma.timer.update({
      where: { id },
      data: {
        subProjects: {
          disconnect: { id: subProjectId },
        },
      },
      include: {
        subProjects: true,
        tags: true,
      },
    });

    let oldSubProject = await prisma.subProject.findFirst({
      where: { id: subProjectId },
    });

    await prisma.subProject.update({
      where: { id: subProjectId },
      data: {
        sumTime: oldSubProject.sumTime - removedProject.sumTime,
      },
    });

    await updateSumTimeProjects(subProjectId);

    return res.status(200).json(removedProject);
  } catch (error) {
    return res.status(500).json({ message: "Не удалось удалить подзадачу." });
  }
};

module.exports = removeSubProjectFromTimer;
