const { prisma } = require("../../prisma/prisma-client");

const updateSumTimeProjects = async (timerId, subProjectId) => {
  try {
    let allProjects = [];

    if (subProjectId) {
      allProjects = await prisma.project.findMany({
        where: {
          subProjects: { some: { id: Number(subProjectId) } },
        },
        include: {
          subProjects: true,
        },
      });
    } else {
      allProjects = await prisma.project.findMany({
        where: {
          subProjects: {
            some: {
              timers: { some: { id: Number(timerId) } },
            },
          },
        },
        include: {
          subProjects: true,
        },
      });
    }

    allProjects.map(async (project) => {
      let sumTime = 0;

      project.subProjects.map((subProject) => {
        sumTime += subProject.sumTime;
      });

      await prisma.project.update({
        where: {
          id: project.id,
        },
        data: { sumTime },
      });
    });

    return allProjects;
  } catch (error) {
    return false;
  }
};

module.exports = updateSumTimeProjects;
