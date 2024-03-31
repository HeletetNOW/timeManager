const { prisma } = require("../../../prisma/prisma-client");

const setSubProjectStatus = async (req, res) => {
  try {
    const { status, id } = req.body;

    if (status == undefined || !id) {
      return res
        .status(400)
        .json({ message: "Заполните все обязательные поля." });
    }

    const updatedSubProject = await prisma.subProject.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json(updatedSubProject);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Не удалось изменить статус проекта." });
  }
};

module.exports = setSubProjectStatus;
