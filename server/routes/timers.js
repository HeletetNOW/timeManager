const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth.js");

//Create timer
router.post("/add", checkAuth, require("../controllers/timers/createTimer.js"));

//Get timers
router.delete(
  "/delete/:id",
  checkAuth,
  require("../controllers/timers/deleteTimer.js")
);

//Get timers
router.post("/", checkAuth, require("../controllers/timers/getTimers.js"));

//Start timer
router.post(
  "/control/start/:id",
  checkAuth,
  require("../controllers/timers/control/startTimer.js")
);

//End timer
router.post(
  "/control/end/:id",
  checkAuth,
  require("../controllers/timers/control/endTimer.js")
);

//Set timer name
router.post(
  "/set/name",
  checkAuth,
  require("../controllers/timers/change/setTimerName.js")
);

//Set timer sumTime
router.post(
  "/set/sum",
  checkAuth,
  require("../controllers/timers/change/setSumTime.js")
);

//Add project
router.post(
  "/add/project",
  checkAuth,
  require("../controllers/timers/add/addProjectsToTimer.js")
);

//Add tag
router.post(
  "/add/tag",
  checkAuth,
  require("../controllers/timers/add/addTagToTimer.js")
);

router.post(
  "/remove/project",
  require("../controllers/timers/remove/removeProjectFromTimer.js")
);

router.post(
  "/remove/tag",
  require("../controllers/timers/remove/removeTagFromTimer.js")
);

module.exports = router;
