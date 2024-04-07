const { prisma } = require("../../../prisma/prisma-client");

const createSubProject = async (req, res) => {
  try {
    const { subProjectName, description = "", projectId } = req.body;

    if (!subProjectName) {
      return res.status(400).json({ message: "Введите название подпроекта." });
    } else if (!projectId) {
      return res.status(400).json({ message: "Введите id проекта." });
    }

    const subProject = await prisma.subProject.create({
      data: {
        sumTime: 0,
        subProjectName,
        description,
        projectId: Number(projectId),
        status: false,
      },
    });

    return res.status(200).json(subProject);
  } catch (error) {
    return res.status(500).json({ message: "Не удалось создать подзадачу." });
  }
};

module.exports = createSubProject;
