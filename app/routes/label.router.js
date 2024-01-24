const {
  labelSchema,
  deleteLabelSchema,
} = require("../Validations/userValidation");
const validation = require("../middleware/validationMiddleware");

module.exports = (app) => {
  const labels = require("../controllers/label.controller");
  var router = require("express").Router();
  router.get("/", labels.findAll);
  router.post("/", validation(labelSchema), labels.create);
  router.get("/:id", labels.findOne);
  router.put("/:id", labels.update);
  router.delete("/:id", validation(deleteLabelSchema), labels.deleteLabel);
  app.use("/api/label", router);
};
