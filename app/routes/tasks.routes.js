module.exports = (app) => {
  const tasks = require("../controllers/tasks.controller.js");
  var router = require("express").Router();
  router.get("/", tasks.findAll);
  router.post("/", tasks.create);
  router.get("/:id", tasks.findById);
  router.put("/:id", tasks.update);
  router.delete("/:id", tasks.delete);
  app.use("/api/tasks", router);
};
