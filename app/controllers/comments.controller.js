const { logger, logConsole } = require("../logger/logger");
const { authJwt } = require("../middleware");
const db = require("../models");
const Comments = db.comments;
const Task = db.tasks;
const Project = db.projects;
const Op = db.Sequelize.Op;
exports.findAll = (req, res) => {
  authJwt.verifyToken(req, res, () => {
    Comments.findAll({
      where: { username: req.userId },
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: `Some error while getting comments`,
        });
        logger.error(err.message || `Some error while getting comments`);
        logConsole.error(err.message || `Some error while getting comments`);
      });
  });
};
exports.create = (req, res) => {
  authJwt.verifyToken(req, res, () => {
    const comment = {
      content: req.body.content,
      posted_At: req.body.posted_At ? req.body.posted_At : null,
      projectId: req.body.projectId,
      taskId: req.body.taskId,
      attachment: req.body.attachment ? req.body.attachment : null,
      username: req.userId,
    };
    Comments.create(comment)
      .then((createdComment) => {
        return Task.findByPk(comment.taskId);
      })
      .then((task) => {
        if (task) {
          task.commentCount += 1;
          return task.save();
        } else {
          res.send({ message: "Task not found." });
          logger.error("Task not found.");
          logConsole.error("Task not found.");
        }
      })
      .then((data) => {
        return Project.findByPk(comment.projectId);
      })
      .then((project) => {
        project.commentCount += 1;
        return project.save();
      })
      .then((updatedTask) => {
        res.send(updatedTask);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Comment.",
        });
        logger.error(
          err.message || "Some error occurred while creating the Comment."
        );
        logConsole.error(
          err.message || "Some error occurred while creating the Comment."
        );
      });
  });
};
exports.update = (req, res) => {
  authJwt.verifyToken(req, res, () => {
    const id = req.params.id;
    Comments.update(req.body, {
      where: { id: id, username: req.userId },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Comment Updates Successfully....",
          });
        } else {
          res.send({
            message: `no comment with id ${id} found`,
          });
          logger.error(`no comment with id ${id} found`);
          logConsole.error(`no comment with id ${id} found`);
        }
      })
      .catch((err) => {
        res.send({
          message: "Error Updating",
        });
        logger.error(err.message || "Error Updating");
        logConsole.error(err.message || "Error Updating");
      });
  });
};
exports.findOne = (req, res) => {
  authJwt.verifyToken(req, res, () => {
    const id = req.params.id;
    Comments.findAll({
      where: { id: id, username: req.userId },
    })
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "No comment with this id found",
        });
        logger.error(err.message || "No comment with this id found");
        logConsole.error(err.message || "No comment with this id found");
      });
  });
};
exports.deleteComment = (req, res) => {
  authJwt.verifyToken(req, res, () => {
    const commentId = req.params.id;

    Comments.findByPk(commentId)
      .then((comment) => {
        if (!comment) {
          res.status(404).send({
            message: `Comment with id=${commentId} not found.`,
          });
          logger.error(`Comment with id=${commentId} not found.`);
          logConsole.error(`Comment with id=${commentId} not found.`);
        }

        const taskId = comment.taskId;

        Comments.destroy({ where: { id: commentId, username: req.userId } })
          .then((numDeleted) => {
            if (numDeleted === 1) {
              Task.findByPk(taskId)
                .then((task) => {
                  if (task) {
                    task.commentCount = Math.max(0, task.commentCount - 1);
                    return task.save();
                  } else {
                    Promise.reject(
                      `Associated Task with id=${taskId} not found.`
                    );
                    logger.error(
                      `Associated Task with id=${taskId} not found.`
                    );
                    logConsole.error(
                      `Associated Task with id=${taskId} not found.`
                    );
                  }
                })
                .catch((error) => {
                  res.send({
                    message: `Comment was deleted, but ${error}`,
                  });
                  logger.error(
                    err.message || `Comment was deleted, but ${error}`
                  );
                  logConsole.error(
                    err.message || `Comment was deleted, but ${error}`
                  );
                });
              Project.findByPk(comment.projectId)
                .then((project) => {
                  if (project) {
                    project.commentCount = Math.max(
                      0,
                      project.commentCount - 1
                    );
                    return project.save();
                  } else {
                    Promise.reject(
                      `Associated Project with id=${comment.projectId} not found`
                    );
                    logger.error(
                      `Associated Project with id=${comment.projectId} not found`
                    );
                    logConsole.error(
                      `Associated Project with id=${comment.projectId} not found`
                    );
                  }
                })
                .then(() => {
                  res.send({
                    message: "Comment was deleted successfully!",
                  });
                });
            } else {
              res.send({
                message: `Cannot delete Comment with id=${commentId}. Maybe Comment was not found...`,
              });
              logger.error(
                `Cannot delete Comment with id=${commentId}. Maybe Comment was not found...`
              );
              logConsole.error(
                `Cannot delete Comment with id=${commentId}. Maybe Comment was not found...`
              );
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: `Error occurred while deleting Comment with id=${commentId}.`,
            });
            logger.error(
              err.message ||
                `Error occurred while deleting Comment with id=${commentId}.`
            );
            logConsole.error(
              err.message ||
                `Error occurred while deleting Comment with id=${commentId}.`
            );
          });
      })
      .catch((err) => {
        res.status(500).send({
          message: `Error occurred while finding Comment with id=${commentId}.`,
        });
        logger.error(
          err.message ||
            `Error occurred while finding Comment with id=${commentId}.`
        );
        logConsole.error(
          err.message ||
            `Error occurred while finding Comment with id=${commentId}.`
        );
      });
  });
};
