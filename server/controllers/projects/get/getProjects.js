const sort = require("./sort");

const getProjects = async (req, res) => {
  try {
    const { sortBy, order, id, projectName, tagId } = req.body;

    const data = await sort(sortBy, order, id, tagId, projectName, req.user.id);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Не удалось получить проекты." });
  }
};

module.exports = getProjects;
