const { prisma } = require("../../../prisma/prisma-client");

const removeSubProject = async (req, res) => {
  try {
    const { subProjectId } = req.params;

    if (!subProjectId) {
      return res
        .status(400)
        .json({ message: "Заполните все обязательные поля." });
    }

    const removedSubProject = await prisma.subProject.delete({
      where: { id: Number(subProjectId) },
    });

    return res.status(200).json(removedSubProject);
  } catch (error) {
    return res.status(500).json({ message: "Не удалось удалить тэг." });
  }
};

module.exports = removeSubProject;
