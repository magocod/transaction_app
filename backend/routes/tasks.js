const express = require("express");
const router = express.Router();

const tasks = require("../controllers/task.controller.js");

router.post("/", tasks.create);

router.get("/", tasks.findAll);

module.exports = router;
