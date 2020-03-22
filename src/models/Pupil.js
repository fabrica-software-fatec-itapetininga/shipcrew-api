const { Model, DataTypes } = require('sequelize');

class Pupil extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        numPresences: DataTypes.INTEGER,
        numAbsences: DataTypes.INTEGER,
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

module.exports = Pupil;
