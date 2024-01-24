const { projectSchema } = require("../Validations/userValidation.js");
const validation = require("../middleware/validationMiddleware.js");

module.exports = (app) => {
  const projects = require("../controllers/projects.controller.js");
  var router = require("express").Router();
  router.get("/", projects.findAll);
  router.post("/", validation(projectSchema), projects.create);
  router.get("/:id", projects.findById);
  router.put("/:id", projects.update);
  router.delete("/:id", projects.delete);
  app.use("/api/projects", router);
};
