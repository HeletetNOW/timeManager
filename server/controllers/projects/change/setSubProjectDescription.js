const { prisma } = require("../../../prisma/prisma-client");

const setSubProjectDescription = async (req, res) => {
  try {
    const { description, id } = req.body;

    if (!description || !id) {
      return res
        .status(400)
        .json({ message: "Заполните все обязательные поля." });
    }

    const updatedSubProject = await prisma.subProject.update({
      where: { id },
      data: { description },
    });

    return res.status(200).json(updatedSubProject);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Не удалось изменить описание проекта." });
  }
};

module.exports = setSubProjectDescription;
