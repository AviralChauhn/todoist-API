const { logger, logConsole } = require("../logger/logger");
const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already  is use!!",
      });
      logger.error("Failed! Username is already  is use!!");
      logConsole.error("Failed! Username is already  is use!!");
      return;
    }
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "Failed!! Email is already in used",
        });
        logger.error("Failed!! Email is already in used");
        logConsole.error("Failed!! Email is already in used");
        return;
      }
      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};
module.exports = verifySignUp;
