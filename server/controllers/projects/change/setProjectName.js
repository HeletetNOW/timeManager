const { prisma } = require("../../../prisma/prisma-client");

const setProjectName = async (req, res) => {
  try {
    const { projectName, id } = req.body;

    if (!projectName || !id) {
      return res
        .status(400)
        .json({ message: "Заполните все обязательные поля." });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: { projectName },
      include: {
        tags: true,
      },
    });

    return res.status(200).json(updatedProject);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Не удалось изменить имя проекта." });
  }
};

module.exports = setProjectName;
