const db = require("../models");
const Labels = db.labels;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  Labels.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(401).send({
        message: "Error Occurred!!!!",
      });
    });
};
exports.create = (req, res) => {
  if (!req.body.id) {
    res.status(401).send({
      message: "ID Cannot be Empty...",
    });
    return;
  }
  const label = {
    id: req.body.id,
    name: req.body.name,
    color: req.body.color ? req.body.color : "charcoal",
    order: req.body.order ? req.body.oreder : null,
    isFavourite: req.body.isFavourite ? req.body.isFavourite : false,
  };
  Labels.create(label)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(401).send({
        message: "Error Occured",
      });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;
  Labels.findAll({
    where: { id: id },
  })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "No label with this id found ",
      });
    });
};
exports.update = (req, res) => {
  const id = req.params.id;
  Labels.update(req.body, {
    where: { id: id },
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
      }
    })
    .catch((err) => {
      res.send({
        message: "Error Updating",
      });
    });
};
exports.deleteLabel = (req, res) => {
  const id = req.params.id;
  Labels.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Deletion successful",
        });
      } else {
        res.send({
          message: "error deleting",
        });
      }
    })
    .catch((err) => {
      res.send({
        message: "Cannot delete the label with id " + id + "facing error" + err,
      });
    });
};
