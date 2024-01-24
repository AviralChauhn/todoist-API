const { logger, logConsole } = require("../logger/logger");
const { authJwt } = require("../middleware");
const db = require("../models");
const Labels = db.labels;
const Task = db.tasks;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  authJwt.verifyToken(req, res, () => {
    Labels.findAll({ where: { username: req.userId } })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(401).send({
          message: "Error Occurred!!!!",
        });
        logger.error("Error Occurred!!!!" || err);
        logConsole.error("Error Occurred!!!!" || err);
      });
  });
};
exports.create = (req, res) => {
  authJwt.verifyToken(req, res, () => {
    const label = {
      name: req.body.name,
      color: req.body.color ? req.body.color : "charcoal",
      order: req.body.order ? req.body.oreder : null,
      isFavourite: req.body.isFavourite ? req.body.isFavourite : false,
      username: req.userId,
    };
    Labels.create(label)
      .then((createdLabel) => {
        return Task.findByPk(req.body.taskId);
      })
      .then((task) => {
        if (task) {
          task.labels = task.labels || [];
          task.labels.push(label.name);
          task.changed("labels", true);
          return task.save();
        } else {
          logger.error("Task Not Found");
          logConsole.error("Task Not Found");
          throw new Error("Task Not Found");
        }
      })
      .then((updatedTask) => {
        res.send(updatedTask);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Label.",
        });
        logger.error(
          "Some error occurred while creating the Label." || err.message
        );
        logConsole.error(
          "Some error occurred while creating the Label." || err.message
        );
      });
  });
};

exports.findOne = (req, res) => {
  authJwt.verifyToken(req, res, () => {
    const id = req.params.id;
    Labels.findAll({
      where: { id: id, username: req.userId },
    })
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: "No label with this id found ",
        });
        logger.error("No label with this id found " || err);
        logConsole.error("No label with this id found " || err);
      });
  });
};
exports.update = (req, res) => {
  authJwt.verifyToken(req, res, () => {
    const id = req.params.id;
    Labels.update(req.body, {
      where: { id: id, username: req.userId },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "label Updates Successfully....",
          });
        } else {
          res.send({
            message: `no label with id ${id} found`,
          });
          logger.error(`no label with id ${id} found`);
          logConsole.error(`no label with id ${id} found`);
        }
      })
      .catch((err) => {
        res.send({
          message: "Error Updating",
        });
        logger.error("Error Updating" || err);
        logConsole.error("Error Updating");
      });
  });
};
exports.deleteLabel = (req, res) => {
  authJwt.verifyToken(req, res, () => {
    const labelId = req.params.id;
    const taskId = req.body.taskId;

    Labels.findOne({ where: { id: labelId } })
      .then((label) => {
        if (!label) {
          logger.error(`Label with id=${labelId} not found.`);
          logConsole.error(`Label with id=${labelId} not found.`);
          return res.status(404).send({
            message: `Label with id=${labelId} not found.`,
          });
        }

        const labelName = label.name;

        Labels.destroy({ where: { id: labelId } })
          .then((numDeleted) => {
            if (numDeleted === 1) {
              Task.findOne({ where: { id: taskId } })
                .then((task) => {
                  if (task && task.username === req.userId) {
                    task.labels = task.labels.filter(
                      (name) => name !== labelName
                    );
                    return task.save();
                  } else {
                    logger.error(
                      `Associated Task with id=${taskId} not found.`
                    );
                    logConsole.error(
                      `Associated Task with id=${taskId} not found.`
                    );
                    return Promise.reject(
                      `Associated Task with id=${taskId} not found.`
                    );
                  }
                })
                .then(() => {
                  res.send({
                    message: "Label was deleted successfully!",
                  });
                })
                .catch((error) => {
                  res.send({
                    message: `Label was deleted, but ${error}`,
                  });
                  logger.error(`Label was deleted, but ${error}` || err);
                  logConsole.error(`Label was deleted, but ${error}`);
                });
            } else {
              res.send({
                message: `Cannot delete Label with id=${labelId}. Maybe Label was not found...`,
              });
              logger.error(
                `Cannot delete Label with id=${labelId}. Maybe Label was not found...`
              );
              logConsole.error(
                `Cannot delete Label with id=${labelId}. Maybe Label was not found...`
              );
            }
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send({
              message: `Error occurred while deleting Label with id=${labelId}.`,
            });
            logger.error(
              `Error occurred while deleting Label with id=${labelId}.` || err
            );
            logConsole.error(
              `Error occurred while deleting Label with id=${labelId}.`
            );
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
          message: `Error occurred while finding Label with id=${labelId}.`,
        });
        logger.error(
          `Error occurred while finding Label with id=${labelId}.` || err
        );
        logConsole.error(
          `Error occurred while finding Label with id=${labelId}.`
        );
      });
  });
};
