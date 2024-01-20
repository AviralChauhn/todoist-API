const db = require("../models");
const Tasks = db.tasks;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  Tasks.findAll({
    where: {
      isCompleted: false,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Some error while getting tasks`,
      });
    });
};
exports.create = (req, res) => {
  if (!req.body.id) {
    res.status(400).send({
      message: "Id Cannot be empty",
    });
    return;
  }
  const task = {
    id: req.body.id,
    projectId: req.body.projectId,
    sectionId: req.body.sectionId ? req.body.sectionId : null,
    content: req.body.content,
    description: req.body.description,
    isCompleted: req.body.isCompleted ? req.body.isCompleted : false,
    labels: req.body.labels ? req.body.labels : [],
    parentId: req.body.parentId ? req.body.parentId : null,
    order: req.body.order ? req.body.order : null,
    priority: req.body.priority ? req.body.priority : null,
    due: req.body.due ? req.body.due : {},
    url: req.body.url ? req.body.url : null,
    commentCount: req.body.commentCount ? req.body.commentCount : 0,
    created_At: req.body.created_At ? req.body.created_At : 0,
    creatorId: req.body.creatorId ? req.body.creatorId : 0,
    assigneeId: req.body.assigneeId ? req.body.assigneeId : 0,
    assignerId: req.body.assignerId ? req.body.assignerId : 0,
    duration: req.body.duration ? req.body.duration : {},
  };
  Tasks.create(task)
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
exports.deleteTask = (req, res) => {
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
exports.findOne = (req, res) => {
  const id = req.params.id;
  Tasks.findAll({
    where: { id: id, isCompleted: true },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "SThis task is completed",
      });
    });
};

exports.toggleIsCompleted = (req, res) => {
  const taskId = req.params.id;
  Tasks.findByPk(taskId)
    .then((task) => {
      if (!task) {
        return res.status(404).send({
          message: `Cannot find Task with id=${taskId}`,
        });
      }

      const newStatus = !task.isCompleted;

      return Tasks.update(
        { isCompleted: newStatus },
        {
          where: {
            id: taskId,
          },
        }
      );
    })
    .then(() => {
      res.status(201).send({
        message: "Completion state updates successfully...",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error toggling Task status with id=${taskId}: ${err.message}`,
      });
    });
};
