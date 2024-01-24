const { commentSchema } = require("../Validations/userValidation");
const validation = require("../middleware/validationMiddleware");

module.exports = (app) => {
  const comments = require("../controllers/comments.controller");
  var router = require("express").Router();
  router.get("/", comments.findAll);
  router.post("/", validation(commentSchema), comments.create);
  router.put("/:id", comments.update);
  router.get("/:id", comments.findOne);
  router.delete("/:id", comments.deleteComment);
  app.use("/api/comment", router);
};
