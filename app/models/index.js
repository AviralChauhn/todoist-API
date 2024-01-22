const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.projects = require("./projects.model.js")(sequelize, Sequelize);
db.tasks = require("./tasks.model.js")(sequelize, Sequelize);
db.comments = require("./comments.model.js")(sequelize, Sequelize);
db.labels = require("./label.model.js")(sequelize, Sequelize);
const Project = require("./projects.model.js")(sequelize, Sequelize);
const Task = require("./tasks.model.js")(sequelize, Sequelize);
const Comment = require("./comments.model.js")(sequelize, Sequelize);
const Label = require("./label.model.js")(sequelize, Sequelize);
Project.hasMany(Task, { foreignKey: "projectId" });
Task.belongsTo(Project, { foreignKey: "projectId" });
Task.hasMany(Comment, { foreignKey: "taskId" });
Comment.belongsTo(Task, { foreignKey: "taskId" });
Project.hasMany(Comment, { foreignKey: "projectId" });
Comment.belongsTo(Project, { foreignKey: "projectId" });
module.exports = {
  Project,
  Task,
  Comment,
};
module.exports = db;
