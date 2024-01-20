module.exports = (app) => {
  const labels = require("../controllers/label.controller");
  var router = require("express").Router();
  router.get("/", labels.findAll);
  router.post("/", labels.create);
  router.get("/:id", labels.findOne);
  router.put("/:id", labels.update);
  router.delete("/:id", labels.deleteLabel);
  app.use("/api/label", router);
};
