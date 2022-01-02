const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const transactions = require("../controllers/transaction.controller.js");

// FIXME validator - reubicar a un lugar mas reutilizable
const transactionValidator = body("title")
  .notEmpty()
  .withMessage("titulo invalido");

router.post("/", transactionValidator, transactions.create);

router.get("/", transactions.findAll);

router.get("/:id", transactions.findOne);

router.put("/:id", transactionValidator, transactions.update);

router.delete("/:id", transactions.delete);

module.exports = router;
