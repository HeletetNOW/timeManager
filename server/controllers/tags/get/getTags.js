const sort = require("./sort");

const getTags = async (req, res) => {
  try {
    const { id, order, tagName, projectId, timerId } = req.body;

    const result = await sort(
      id,
      order,
      projectId,
      timerId,
      tagName,
      req.user.id
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Не удалось получить теги." });
  }
};

module.exports = getTags;
