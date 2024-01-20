module.exports = (app) => {
  const projects = require("../controllers/projects.controller.js");
  var router = require("express").Router();
  router.get("/", projects.findAll);
  router.post("/", projects.create);
  router.get("/:id", projects.findById);
  router.put("/:id", projects.update);
  router.delete("/:id", projects.delete);
  app.use("/api/projects", router);
};
