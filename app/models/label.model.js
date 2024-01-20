module.exports = (sequelize, Sequelize) => {
  const Label = sequelize.define("label", {
    id: {
      type: Sequelize.STRING,
      required: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    color: {
      type: Sequelize.STRING,
    },
    order: {
      type: Sequelize.INTEGER,
    },
    isFavourite: {
      type: Sequelize.BOOLEAN,
    },
  });
  return Label;
};
