const db = require("../models");

// const Transaction = db.transactions; // old_models

/**
 * @type {Transaction}
 */
const Transaction = db.Transaction; // models
// const Op = db.Sequelize.Op;

const { validationResult } = require("express-validator");

/**
 *
 * @param {Request<P, ResBody, ReqBody, ReqQuery, Locals>} req
 * @param {Response<ResBody, Locals>} res
 */
exports.create = (req, res) => {
  const errors = validationResult(req);
  // console.log(errors)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const reqData = {
    title: req.body.title,
  };

  Transaction.create(reqData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error creando la transaccion",
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
        message: err.message || "error cargando las transaccion",
      });
    });
};

/**
 *
 * @param {Request<P, ResBody, ReqBody, ReqQuery, Locals>} req
 * @param {Response<ResBody, Locals>} res
 */
exports.findOne = (req, res) => {
  const id = req.params.id;

  Transaction.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `no se puede encontrar la transacción con id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "error buscando la transacción con id=" + id,
      });
    });
};

/**
 *
 * @param {Request<P, ResBody, ReqBody, ReqQuery, Locals>} req
 * @param {Response<ResBody, Locals>} res
 */
exports.update = (req, res) => {
  const id = req.params.id;

  const errors = validationResult(req);
  // console.log(errors)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Transaction.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Transaction editada con exito.",
        });
      } else {
        res.send({
          message: `no es posible actualizar transaccion con id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "error actualizando transaccion con id=" + id,
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
          message: "transaccion eliminada con exito",
        });
      } else {
        res.send({
          message: `no es posible eliminar transaccion con id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "error eliminando transaccion con id=" + id,
      });
    });
};
