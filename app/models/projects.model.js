module.exports = (sequelize, Sequelize) => {
  const Projects = sequelize.define("projects", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    parentId: {
      type: Sequelize.INTEGER,
    },
    order: {
      type: Sequelize.INTEGER,
    },
    color: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    commentCount: {
      type: Sequelize.INTEGER,
    },
    isShared: {
      type: Sequelize.BOOLEAN,
    },
    isFavourite: {
      type: Sequelize.BOOLEAN,
    },
    isInboxProject: {
      type: Sequelize.BOOLEAN,
    },
    isTeamInbox: {
      type: Sequelize.BOOLEAN,
    },
    url: {
      type: Sequelize.STRING,
    },
    viewStyle: {
      type: Sequelize.STRING,
    },
  });

  return Projects;
};
