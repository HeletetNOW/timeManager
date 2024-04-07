const { prisma } = require("../../../prisma/prisma-client");

const updateSumTimeProjects = async (subProjectId) => {
  const allProjects = await prisma.project.findMany({
    where: {
      subProjects: {
        some: {
          id: Number(subProjectId),
        },
      },
    },
    include: {
      subProjects: true,
    },
  });

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
};

module.exports = updateSumTimeProjects;