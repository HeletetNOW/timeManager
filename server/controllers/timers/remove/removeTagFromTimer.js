const { prisma } = require("../../../prisma/prisma-client");

const removeTagFromTimer = async (req, res) => {
  try {
    const { id, tagId } = req.body;

    if (!id || !tagId) {
      return res
        .status(400)
        .json({ message: "Заполните все обязательные поля." });
    }

    const removedTag = await prisma.timer.update({
      where: { id },
      data: {
        tags: {
          disconnect: { id: tagId },
        },
      },
      include: {
        projects: true,
        tags: true,
      },
    });

    return res.status(200).json(removedTag);
  } catch (error) {
    return res.status(500).json({ message: "Не удалось удалить теги." });
  }
};

module.exports = removeTagFromTimer;
