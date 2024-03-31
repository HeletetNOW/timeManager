const currentUser = async (req, res) => {
  return res.status(200).json({
    user: {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      surname: req.user.surname,
    },
  });
};

module.exports = currentUser;
