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
    },
    taskId: {
      type: Sequelize.STRING,
    },
    attachment: {
      type: Sequelize.JSONB,
    },
  });
  return Comment;
};
