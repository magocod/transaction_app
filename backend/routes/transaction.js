var express = require("express");
var router = express.Router();

const transaction = require("../controllers/transaction.controller.js");

router.post("/", transaction.create);

router.get("/", transaction.findAll);

router.get("/:id", transaction.findOne);

router.put("/:id", transaction.update);

router.delete("/:id", transaction.delete);

module.exports = router;
