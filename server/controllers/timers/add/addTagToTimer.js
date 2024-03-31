const { prisma } = require("../../../prisma/prisma-client");

const addTagsToTimer = async (req, res) => {
  try {
    const { id, tagId } = req.body;

    if (!id || !tagId) {
      return res
        .status(400)
        .json({ message: "Заполните все обязательные поля." });
    }

    const addedTags = await prisma.timer.update({
      where: { id },
      data: {
        tags: {
          connect: { id: tagId },
        },
      },
      include: {
        projects: true,
        tags: true,
      },
    });

    return res.status(200).json(addedTags);
  } catch (error) {
    return res.status(500).json({ message: "Не удалось добавить теги." });
  }
};

module.exports = addTagsToTimer;
