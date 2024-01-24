module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    projectId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "projects", // This should match the name of the Project model
        key: "id",
      },
    },
    sectionId: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    isCompleted: {
      type: Sequelize.BOOLEAN,
    },
    labels: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    order: {
      type: Sequelize.INTEGER,
    },
    priority: {
      type: Sequelize.INTEGER,
    },
    due: {
      type: Sequelize.JSONB,
    },
    url: {
      type: Sequelize.STRING,
    },
    commentCount: {
      type: Sequelize.INTEGER,
    },
    created_At: {
      type: Sequelize.STRING,
    },
    creatorId: {
      type: Sequelize.STRING,
    },
    assigneeId: {
      type: Sequelize.STRING,
    },
    assignerId: {
      type: Sequelize.STRING,
    },
    duration: {
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
  Task.associate = (models) => {
    Task.belongsTo(models.Projects, { foreignKey: "projectId", as: "project" });
  };
  return Task;
};
