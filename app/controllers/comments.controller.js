const db = require("../models");
const Comments = db.comments;
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
    projectId: req.body.projectId ? req.body.projectId : null,
    taskId: req.body.taskId,
    attachment: req.body.attachment ? req.body.attachment : null,
  };
  Comments.create(comment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(401).send({
        message: "Error Occured",
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
  const id = req.params.id;
  Comments.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Comment Deleted succefully.....",
        });
      } else {
        res.send({
          message: `Cannot delete Comment with is =${id}. Maybe Task was not Found...`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete comment with id=" + id,
      });
    });
};
