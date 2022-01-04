const db = require("../models");

/**
 * @type {Task}
 */
const Task = db.Task; // models

/**
 * @type {User}
 */
const User = db.User;

/**
 *
 * @param {Request<P, ResBody, ReqBody, ReqQuery, Locals>} req
 * @param {Response<ResBody, Locals>} res
 */
exports.create = (req, res) => {
  const reqData = {
    name: req.body.name,
    userId: req.body.userId,
  };

  Task.create(reqData, { include: [User] })
    .then(async (data) => {
      await data.reload(); // Trip to bd unnecessary
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error creando la task",
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
  Task.findAll({ include: [User] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error cargando las task",
      });
    });
};
