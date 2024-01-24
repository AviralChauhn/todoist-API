const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const validation = require("../middleware/validationMiddleware");
const { userSchema, signInSchema } = require("../Validations/userValidation");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [validation(userSchema), verifySignUp.checkDuplicateUsernameOrEmail],
    controller.signup
  );

  app.post("/api/auth/signin", validation(signInSchema), controller.signin);
};
