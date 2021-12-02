var express = require("express");
var router = express.Router();

const { body } = require("express-validator");

const transaction = require("../controllers/transaction.controller.js");

// FIXME validator - reubicar a un lugar mas reutilizable
const transactionValidator = body("title")
  .notEmpty()
  .withMessage("titulo invalido");

router.post("/", transactionValidator, transaction.create);

router.get("/", transaction.findAll);

router.get("/:id", transaction.findOne);

router.put("/:id", transactionValidator, transaction.update);

router.delete("/:id", transaction.delete);

module.exports = router;
