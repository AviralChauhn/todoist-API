module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    content: {
      type: Sequelize.STRING,
    },
    posted_At: {
      type: Sequelize.STRING,
    },
    projectId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "projects",
        key: "id",
      },
    },
    taskId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "tasks",
        key: "id",
      },
    },
    attachment: {
      type: Sequelize.JSONB,
    },
    username: {
      type: Sequelize.STRING,
      references: {
        model: "users",
        key: "username",
      },
    },
  });
  return Comment;
};
