const { prisma } = require("../../prisma/prisma-client");

const createProject = async (req, res) => {
  try {
    const { projectName, description = "", tags = [] } = req.body;

    if (!projectName) {
      return res.status(400).json({ message: "Введите название проекта." });
    }

    const project = await prisma.project.create({
      data: {
        projectName,
        description,
        author: {
          connect: { id: req.user.id },
        },
        tags: {
          connect: tags.map((tag) => ({
            id: tag.id,
          })),
        },
        status: false,
      },
      include: {
        tags: true,
      },
    });

    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ message: "Не удалось создать проект." });
  }
};

module.exports = createProject;
