const { prisma } = require("../../prisma/prisma-client");

const updateSumTimeProjects = async (timerId, subProjectId) => {
  try {
    let allSubProjects = [];

    if (subProjectId) {
      allSubProjects = await prisma.subProject.findMany({
        where: {
          id: Number(subProjectId),
        },
        include: {
          timers: true,
        },
      });
    } else {
      allSubProjects = await prisma.subProject.findMany({
        where: {
          timers: {
            some: {
              id: Number(timerId),
            },
          },
        },
        include: {
          timers: true,
        },
      });
    }

    allSubProjects.map(async (subProject) => {
      let sumTime = subProject.timers.reduce(
        (acc, obj) => acc + obj.sumTime,
        0
      );

      await prisma.subProject.update({
        where: {
          id: subProject.id,
        },
        data: {
          sumTime,
        },
      });
    });
  } catch (error) {
    return false;
  }
};

module.exports = updateSumTimeProjects;
