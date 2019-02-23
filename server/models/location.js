export default (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    parent_code: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      unique: true
    },
    location_code: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    }
  });

  Location.associate = (models) => {
    Location.hasMany(models.Population, {
      foreignKey: 'location_code',
    });
  };
  return Location;
};
