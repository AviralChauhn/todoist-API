module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    id: {
      type: Sequelize.STRING,
      required: true,
      primaryKey: true,
    },
    content: {
      type: Sequelize.STRING,
    },
    posted_At: {
      type: Sequelize.STRING,
    },
    projectId: {
      type: Sequelize.STRING,
      references: {
        model: "projects",
        key: "id",
      },
    },
    taskId: {
      type: Sequelize.STRING,
      references: {
        model: "tasks",
        key: "id",
      },
    },
    attachment: {
      type: Sequelize.JSONB,
    },
  });
  return Comment;
};
