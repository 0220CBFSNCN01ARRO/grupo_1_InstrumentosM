'use strict';
module.exports = (sequelize, DataTypes) => {
  const articles = sequelize.define('articles', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2),
    discount: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    brand_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    provider_id: DataTypes.INTEGER,
    outstanding: DataTypes.INTEGER,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    tableName: 'articles',
  });
  articles.associate = function(models) {
    // associations can be defined here
  };
  return articles;
};