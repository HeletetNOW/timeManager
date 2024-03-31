const { prisma } = require("../../../prisma/prisma-client");

const setProjectStatus = async (req, res) => {
  try {
    const { status, id } = req.body;

    if (!status || !id) {
      return res
        .status(400)
        .json({ message: "Заполните все обязательные поля." });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: { status },
      include: {
        tags: true,
        timers: true,
      },
    });

    return res.status(200).json(updatedProject);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Не удалось изменить статус проекта." });
  }
};

module.exports = setProjectStatus;
