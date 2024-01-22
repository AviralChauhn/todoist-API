const db = require("../models");
const Comments = db.comments;
const Task = db.tasks;
const Project = db.projects;
const Op = db.Sequelize.Op;
exports.findAll = (req, res) => {
  Comments.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Some error while getting comments`,
      });
    });
};
exports.create = (req, res) => {
  if (!req.body.id) {
    req.status(400).send({
      message: `Some Error Occured`,
    });
    return;
  }
  const comment = {
    id: req.body.id,
    content: req.body.content ? req.body.content : null,
    posted_At: req.body.posted_At ? req.body.posted_At : null,
    projectId: req.body.projectId,
    taskId: req.body.taskId,
    attachment: req.body.attachment ? req.body.attachment : null,
  };
  Comments.create(comment)
    .then((createdComment) => {
      // Update comment_count of the associated task
      return Task.findByPk(comment.taskId);
    })
    .then((task) => {
      if (task) {
        // Increment comment_count and update the task
        task.commentCount += 1;
        return task.save();
      } else {
        throw new Error("Task not found.");
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
    });
};
exports.update = (req, res) => {
  const id = req.params.id;
  Comments.update(req.body, {
    where: { id: id },
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
      }
    })
    .catch((err) => {
      res.send({
        message: "Error Updating",
      });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;
  Comments.findAll({
    where: { id: id },
  })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "No comment with this id found",
      });
    });
};
exports.deleteComment = (req, res) => {
  const commentId = req.params.id;

  Comments.findByPk(commentId)
    .then((comment) => {
      if (!comment) {
        return res.status(404).send({
          message: `Comment with id=${commentId} not found.`,
        });
      }

      const taskId = comment.taskId;

      Comments.destroy({ where: { id: commentId } })
        .then((numDeleted) => {
          if (numDeleted === 1) {
            Task.findByPk(taskId)
              .then((task) => {
                if (task) {
                  task.commentCount = Math.max(0, task.commentCount - 1);
                  return task.save();
                } else {
                  return Promise.reject(
                    `Associated Task with id=${taskId} not found.`
                  );
                }
              })
              .catch((error) => {
                res.send({
                  message: `Comment was deleted, but ${error}`,
                });
              });
            Project.findByPk(comment.projectId)
              .then((project) => {
                if (project) {
                  project.commentCount = Math.max(0, project.commentCount - 1);
                  return project.save();
                } else {
                  return Promise.reject(
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
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send({
            message: `Error occurred while deleting Comment with id=${commentId}.`,
          });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: `Error occurred while finding Comment with id=${commentId}.`,
      });
    });
};
