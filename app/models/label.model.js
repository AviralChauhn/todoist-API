module.exports = (sequelize, Sequelize) => {
  const Label = sequelize.define("label", {
    id: {
      type: Sequelize.UUID,
      required: true,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
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
    username: {
      type: Sequelize.STRING,
      references: {
        model: "users",
        key: "username",
      },
    },
  });
  return Label;
};
