const db = require("../models");
const Transaction = db.transactions;
const Op = db.Sequelize.Op;

/**
 *
 * @param {Request<P, ResBody, ReqBody, ReqQuery, Locals>} req
 * @param {Response<ResBody, Locals>} res
 */
exports.create = (req, res) => {
  // TODO validate request
  const reqData = {
    title: req.body.title,
  };
  Transaction.create(reqData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Transaction.",
      });
    });
};

/**
 *
 * @param {Request<P, ResBody, ReqBody, ReqQuery, Locals>} req
 * @param {Response<ResBody, Locals>} res
 */
exports.findAll = (req, res) => {
  // TODO filter and paginate
  Transaction.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transactions.",
      });
    });
};

/**
 *
 * @param {Request<P, ResBody, ReqBody, ReqQuery, Locals>} req
 * @param {Response<ResBody, Locals>} res
 */
exports.findOne = (req, res) => {
  // TODO validate params
  const id = req.params.id;

  Transaction.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Transaction with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Transaction with id=" + id,
      });
    });
};

/**
 *
 * @param {Request<P, ResBody, ReqBody, ReqQuery, Locals>} req
 * @param {Response<ResBody, Locals>} res
 */
exports.update = (req, res) => {
  // TODO validate params
  const id = req.params.id;

  // TODO optimize, success & error responses
  Transaction.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Transaction was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Transaction was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Transaction with id=" + id,
      });
    });
};

/**
 *
 * @param {Request<P, ResBody, ReqBody, ReqQuery, Locals>} req
 * @param {Response<ResBody, Locals>} res
 */
exports.delete = (req, res) => {
  const id = req.params.id;

  Transaction.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Transaction was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Transaction with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Transaction with id=" + id,
      });
    });
};
