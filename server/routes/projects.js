const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");

router.post(
  "/create",
  checkAuth,
  require("../controllers/projects/createProject")
);

router.delete(
  "/delete/:id",
  checkAuth,
  require("../controllers/projects/deleteProject")
);

router.post("/", checkAuth, require("../controllers/projects/get/getProjects"));

router.post(
  "/set/status",
  checkAuth,
  require("../controllers/projects/change/setProjectStatus")
);

router.post(
  "/set/name",
  checkAuth,
  require("../controllers/projects/change/setProjectName")
);

router.post(
  "/set/description",
  checkAuth,
  require("../controllers/projects/change/setProjectDescription")
);
router.post(
  "/set/substatus",
  checkAuth,
  require("../controllers/projects/change/setSubProjectStatus")
);

router.post(
  "/set/subname",
  checkAuth,
  require("../controllers/projects/change/setSubProjectName")
);

router.post(
  "/set/subdescription",
  checkAuth,
  require("../controllers/projects/change/setSubProjectDescription")
);

router.post(
  "/add/tags",
  checkAuth,
  require("../controllers/projects/add/addTagsToProject")
);

router.post(
  "/add/timers",
  checkAuth,
  require("../controllers/projects/add/addTimersToProject")
);

router.post(
  "/add/subproject",
  checkAuth,
  require("../controllers/projects/add/addSubPojectToProject")
);

router.delete(
  "/remove/subproject/:subProjectId",
  checkAuth,
  require("../controllers/projects/remove/removeSubProject")
);

router.post(
  "/remove/tag",
  checkAuth,
  require("../controllers/projects/remove/removeTagFromProject")
);

module.exports = router;
