'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
    name: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {
    tableName: 'brands',
    timestamps: false

  });
  Brand.associate = function(models) {
    Brand.hasMany(models.Articles,{
      as:'article',
      foreignKey: 'brand_id'
    })

    // associations can be defined here
  };
  return Brand;
};