const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { logger, logConsole } = require("../logger/logger");

exports.signup = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      res.send({ message: "User was registered successfully" });
    })
    .catch((err) => {
      res.send({ message: err.message });
      logger.error(err.message);
      logConsole.error(err.message);
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        logger.error("User Not found.");
        logConsole.error("User Not found.");
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        logger.error("Invalid Password!");
        logConsole.error("Invalid Password!");
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.username }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400,
      });

      return res
        .status(200)
        .send({ message: "Login Successfully", accessToken: token });
    })
    .catch((err) => {
      res.status(500).send({ message: "Internal Server Error" });
      logger.error(err || "Internal Server Error");
      logConsole.error(err || "Internal Server Error");
    });
};
