const { prisma } = require("../../../prisma/prisma-client");

const addTagsToProject = async (req, res) => {
  try {
    const { id, tagId } = req.body;

    if (!id || !tagId) {
      return res
        .status(400)
        .json({ message: "Заполните все обязательные поля." });
    }

    const addedTags = await prisma.project.update({
      where: { id },
      data: {
        tags: {
          connect: { id: Number(tagId) },
        },
      },
      include: {
        timers: true,
        tags: true,
      },
    });

    return res.status(200).json(addedTags);
  } catch (error) {
    return res.status(500).json({ message: "Не удалось добавить проекты." });
  }
};

module.exports = addTagsToProject;
