export default (sequelize, DataTypes) => {
  const Population = sequelize.define('Population', {
    location_code: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      unique: true
    },
    male_population: {
      type: DataTypes.INTEGER,
    },
    female_population: {
      type: DataTypes.INTEGER,
    }
  });

  Population.associate = (models) => {
    Population.belongsTo(models.Location, {
      foreignKey: 'location_code',
      onDelete: 'CASCADE'
    });
  };
  return Population;
};
