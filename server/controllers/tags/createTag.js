const { prisma } = require("../../prisma/prisma-client");

const createTag = async (req, res) => {
  try {
    const { tagName, projects = [] } = req.body;

    if (!tagName) {
      return res.status(400).json({ message: "Введите название тега." });
    }

    console.log(projects);

    const tag = await prisma.tag.create({
      data: {
        tagName,
        author: {
          connect: { id: req.user.id },
        },
        projects: {
          connect: projects.map((project) => ({
            id: project.id,
          })),
        },
      },
    });

    return res.status(200).json(tag);
  } catch (error) {
    return res.status(500).json({ message: "Не удалось создать тег." });
  }
};

module.exports = createTag;
