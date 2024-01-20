module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    projectId: {
      type: Sequelize.STRING,
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
    parentId: {
      type: Sequelize.STRING,
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
  });
  return Task;
};
