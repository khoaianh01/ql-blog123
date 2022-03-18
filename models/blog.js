'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog.belongsTo(models.Topic)
    }
  }
  Blog.init({
    title: DataTypes.STRING,
    des: DataTypes.STRING,
    view: DataTypes.INTEGER,
    content: DataTypes.STRING,
    avata: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};