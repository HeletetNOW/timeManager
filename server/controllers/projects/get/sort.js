const { prisma } = require("../../../prisma/prisma-client");

const sort = async (sortBy, isDesc, id, tagId, maybeProjectName, authorId) => {
  try {
    const where = {
      authorId,
      projectName: { contains: maybeProjectName },
    };
    if (!id) {
      if (tagId) {
        const tagIds = tagId.map((tag) => tag.id);
        if (tagIds.length > 0) {
          where.tags = { some: { id: { in: tagIds } } };
        }
      }
    } else {
      where.id = Number(id);
    }

    const orderBy =
      sortBy === "projectName" ? { projectName: isDesc } : { status: isDesc };

    const data = await prisma.project.findMany({
      orderBy,
      where: where,
      include: {
        tags: true,
        subProjects: true,
        subProjects: { include: { timers: true } },
      },
    });

    return data;
  } catch (error) {
    return [];
  }
};

module.exports = sort;
