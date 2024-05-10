const { prisma } = require("../../../prisma/prisma-client");

const setProjectDescription = async (req, res) => {
  try {
    const { description, id } = req.body;

    if (!description || !id) {
      return res
        .status(400)
        .json({ message: "Заполните все обязательные поля." });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: { description },
      include: {
        tags: true,
      },
    });

    return res.status(200).json(updatedProject);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Не удалось изменить описание проекта." });
  }
};

module.exports = setProjectDescription;
