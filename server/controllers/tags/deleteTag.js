const { prisma } = require("../../prisma/prisma-client");

const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Введите id тега." });
    }

    await prisma.tag.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    return res.status(500).json({ message: "Не удалось удалить тег." });
  }
};

module.exports = deleteTag;
