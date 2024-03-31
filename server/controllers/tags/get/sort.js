const { prisma } = require("../../../prisma/prisma-client");

const sort = async (id, order, projectId, timerId, maybeTagName, authorId) => {
  try {
    const where = {
      authorId,
      tagName: {
        contains: maybeTagName,
      },
    };

    if (!id) {
      if (projectId) where.projects = { some: { id: projectId } };
      if (timerId) where.timers = { some: { id: timerId } };
    } else {
      where.id = Number(projectId);
    }

    const data = await prisma.tag.findMany({
      orderBy: {
        tagName: order,
      },
      where: where,
      include: { projects: true },
    });

    return data;
  } catch (error) {
    return false;
  }
};

module.exports = sort;
