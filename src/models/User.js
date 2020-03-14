const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        pass: DataTypes.VIRTUAL,
        password: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.pass) {
        user.password = await bcrypt.hash(user.pass, 8);
      }
    });

    return this;
  }

  checkPassword(pass) {
    return bcrypt.compare(pass, this.password);
  }
}

module.exports = User;
