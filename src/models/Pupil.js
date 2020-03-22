const { Model, DataTypes } = require('sequelize');
// const bcrypt = require('bcryptjs');

class Pupil extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        address: DataTypes.STRING,
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
