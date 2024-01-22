module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
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
      allowNull: false,
      references: {
        model: "projects",
        key: "id",
      },
    },
    taskId: {
      type: Sequelize.STRING,
      allowNull: false,
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
