const { taskSchema } = require("../Validations/userValidation.js");
const validation = require("../middleware/validationMiddleware.js");

module.exports = (app) => {
  const tasks = require("../controllers/tasks.controller.js");
  var router = require("express").Router();
  router.get("/", tasks.findAll);
  router.post("/", validation(taskSchema), tasks.create);
  router.put("/:id", tasks.update);
  router.delete("/:id", tasks.deleteTask);
  router.get("/:id", tasks.findOne);
  router.put("/toggle/:id", tasks.toggleIsCompleted);
  app.use("/api/tasks", router);
};
