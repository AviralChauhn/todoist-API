const { logger, logConsole } = require("../logger/logger");

const validation = (schema) => async (req, res, next) => {
  const body = req.body;
  try {
    await schema.validate(body);
    return next();
  } catch (err) {
    logger.error(err.message);
    logConsole.error(err.message);
    return res.status(400).json({ err });
  }
};

module.exports = validation;
