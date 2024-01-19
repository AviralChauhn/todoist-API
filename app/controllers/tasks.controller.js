const db = require("../models");
const Tasks = db.tasks;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.iLike]: `%${id}%` } } : null;
  Tasks.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error while getting tasks`,
      });
    });
};
exports.create = (req, res) => {
  if (!req.body.id) {
    res.status(400).send({
      message: "id cannot be empty",
    });
    return;
  }
  const tasks = {
    id: req.body.id,
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
  };
  Tasks.create(tasks)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial..",
      });
    });
};
exports.findById = (req, res) => {
  const id = req.params.id;
  Tasks.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Task with id=` + id,
      });
    });
};
exports.update = (req, res) => {
  const id = req.params.id;
  Tasks.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task updated successfully....",
        });
      } else {
        res.send({
          message: `no task with ${id} found`,
        });
      }
    })
    .catch((err) => {
      res.send({
        message: "Error Updating ",
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  Tasks.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Task Deleted succefully.....",
        });
      } else {
        res.send({
          message: `Cannot delete Task with is =${id}. Maybe Task was not Found...`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Task with id=" + id,
      });
    });
};
