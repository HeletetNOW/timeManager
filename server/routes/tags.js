const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth.js");

//Create tag
router.post("/add", checkAuth, require("../controllers/tags/createTag.js"));

//Create tag
router.delete(
  "/delete/:id",
  checkAuth,
  require("../controllers/tags/deleteTag.js")
);

//Get tags
router.post("/", checkAuth, require("../controllers/tags/get/getTags.js"));

//Set tag name
router.post(
  "/set/name",
  checkAuth,
  require("../controllers/tags/change/setTagName.js")
);

//Add project to tag
router.post(
  "/add/projects",
  checkAuth,
  require("../controllers/tags/add/addProjectsToTag.js")
);

//remove project from tags
router.post(
  "/remove/projects",
  checkAuth,
  require("../controllers/tags/remove/removeProjectToTag.js")
);

module.exports = router;
