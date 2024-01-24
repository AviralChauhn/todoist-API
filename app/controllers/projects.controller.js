const { logger, logConsole } = require("../logger/logger");
const { authJwt } = require("../middleware");
const db = require("../models");
const Projects = db.projects;
const Op = db.Sequelize.Op;
// const jwt=require("jsonwebtoken")
// const config=require('../config/auth.config')
exports.findAll = (req, res) => {
  const id = req.query.id;
  authJwt.verifyToken(req, res, () => {
    Projects.findAll({
      where: {
        username: req.userId,
      },
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        logger.error(err || `Some error while getting Projects`);
        logConsole.error(`Some error while getting Projects`);
      });
  });
};
exports.create = (req, res) => {
  authJwt.verifyToken(req, res, () => {
    const projects = {
      parentId: req.body.parentId,
      order: req.body.order,
      color: req.body.color,
      name: req.body.name,
      commentCount: req.body.commentCount ? req.body.commentCount : 0,
      isShared: req.body.isShared,
      isFavorite: req.body.isFavorite,
      isInboxProject: req.body.isInboxProject,
      isTeamInbox: req.body.idTeamInbox,
      viewStyle: req.body.viewStyle,
      url: req.body.url,
      username: req.userId,
    };
    Projects.create(projects)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial..",
        });
        logger.error(
          err.message || `Some error occurred while creating the Tutorial..`
        );
        logConsole.error(
          err.message || `Some error occurred while creating the Tutorial..`
        );
      });
  });
};
exports.findById = (req, res) => {
  authJwt.verifyToken(req, res, () => {
    const id = req.params.id;
    Projects.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${id}`,
          });
          logger.error(`Cannot find Tutorial with id=${id}`);
          logConsole.error(`Cannot find Tutorial with id=${id}`);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: `Error retrieving Task with id=` + id,
        });
        logger.error(err || `Error retrieving Task with id=` + id);
        logConsole.error(`Error retrieving Task with id=` + id);
      });
  });
};
exports.update = (req, res) => {
  authJwt.verifyToken(req, res, () => {
    const id = req.params.id;
    Projects.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Project updated successfully....",
          });
        } else {
          res.send({
            message: `no Project with ${id} found`,
          });
          logger.error(`no Project with ${id} found`);
          logConsole.error(`no Project with ${id} found`);
        }
      })
      .catch((err) => {
        res.send({
          message: "Error Updating ",
        });
        logger.error(err || `Error Updating `);
        logConsole.error(err || `Error Updating `);
      });
  });
};
exports.delete = (req, res) => {
  authJwt.verifyToken(req, res, () => {
    const id = req.params.id;

    Projects.findOne({
      where: { id: id, username: req.userId },
    })
      .then((project) => {
        if (!project) {
          res.status(404).send({
            message: `Cannot delete Project with id=${id}. Project not found for the authenticated user.`,
          });
          logger.error(
            `Cannot delete Project with id=${id}. Project not found for the authenticated user.`
          );
          logConsole.error(
            `Cannot delete Project with id=${id}. Project not found for the authenticated user.`
          );
        } else {
          Projects.destroy({
            where: { id: id, username: req.userId },
          })
            .then((num) => {
              if (num == 1) {
                res.send({
                  message: "Project was deleted successfully!",
                });
              } else {
                res.send({
                  message: `Cannot delete Project with id=${id}. Maybe Project was not Found...`,
                });
                logger.error(
                  `Cannot delete Project with id=${id}. Maybe Project was not Found...`
                );
                logConsole.error(
                  `Cannot delete Project with id=${id}. Maybe Project was not Found...`
                );
              }
            })
            .catch((err) => {
              res.status(500).send({
                message: "Could not delete Project with id=" + id,
              });
              logger.error(err || "Could not delete Project with id=" + id);
              logConsole.error("Could not delete Project with id=" + id);
            });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error finding Project for deletion with id=" + id,
        });
        logger.error("Error finding Project for deletion with id=" + id);
        logConsole.error("Error finding Project for deletion with id=" + id);
      });
  });
};
