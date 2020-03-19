const jwt = require('jsonwebtoken');
const yup = require('yup');
const User = require('../models/User');

const authConfig = require('../config/auth');

module.exports = {
  async store(req, res) {
    const schema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required(),
      password: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ success: false, message: 'Validation fails' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });

    if (!(await user.checkPassword(password)))
      return res
        .status(401)
        .json({ success: false, message: 'Password does not match' });

    const { id, name } = user;

    return res.json({
      success: true,
      user: { id, name },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  },
};
