const { prisma } = require("../../../prisma/prisma-client");

const removeProjectToTag = async (req, res) => {
  try {
    const { id, projectId } = req.body;

    if (!id || !projectId) {
      return res
        .status(400)
        .json({ message: "Заполните все обязательные поля." });
    }

    const removedProject = await prisma.tag.update({
      where: { id },
      data: {
        projects: {
          disconnect: { id: Number(projectId) },
        },
      },
      include: {
        projects: true,
      },
    });

    return res.status(200).json(removedProject);
  } catch (error) {
    return res.status(500).json({ message: "Не удалось удалить проект." });
  }
};

module.exports = removeProjectToTag;
