const { prisma } = require("../../../prisma/prisma-client");

const setSubProjectName = async (req, res) => {
  try {
    const { subProjectName, id } = req.body;

    if (!projectName || !id) {
      return res
        .status(400)
        .json({ message: "Заполните все обязательные поля." });
    }

    const updatedSubProject = await prisma.subProject.update({
      where: { id },
      data: { subProjectName },
    });

    return res.status(200).json(updatedSubProject);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Не удалось изменить имя проекта." });
  }
};

module.exports = setSubProjectName;
