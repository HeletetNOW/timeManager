const { prisma } = require("../../../prisma/prisma-client");

const setTagName = async (req, res) => {
  try {
    const { tagName, id } = req.body;

    if (!tagName || !id) {
      return res
        .status(400)
        .json({ message: "Заполните все обязательные поля." });
    }

    const updatedTag = await prisma.tag.update({
      where: { id },
      data: { tagName },
      include: {
        projects: true,
      },
    });

    return res.status(200).json(updatedTag);
  } catch (error) {
    return res.status(500).json({ message: "Не удалось изменить имя тега." });
  }
};

module.exports = setTagName;
