const yup = require('yup');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json({
        success: true,
        users,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  async show(req, res) {
    try {
      const user = await User.findOne({
        where: { id: req.params.id },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      res.json(user);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  async store(req, res) {
    try {
      const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup
          .string()
          .email()
          .required(),
        pass: yup
          .string()
          .required()
          .min(6),
        isActive: yup.bool().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({
          success: false,
          message: 'Validation fails',
        });
      }

      const userExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'User already exists',
        });
      }

      const { name, email, isActive } = await User.create(req.body);

      return res.json({
        success: true,
        user: {
          name,
          email,
          isActive,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  async update(req, res) {
    try {
      const schema = yup.object().shape({
        name: yup.string(),
        email: yup.string().email(),
        oldPassword: yup.string().min(6),
        password: yup
          .string()
          .min(6)
          .when('oldPassword', (oldPassword, field) =>
            oldPassword ? field.required() : field
          ),
        confirmPassword: yup
          .string()
          .when('password', (password, field) =>
            password ? field.required().oneOf([yup.ref('password')]) : field
          ),
      });

      if (!(await schema.isValid(req.body)))
        return res
          .status(400)
          .json({ success: false, message: 'Validation fails' });

      const { email, oldPassword } = req.body;

      const user = await User.findByPk(req.params.id);

      if (email && email !== user.email) {
        const userExists = await User.findOne({
          where: { email },
        });

        if (userExists)
          return res
            .status(400)
            .json({ success: false, message: 'User already exists!' });
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res
          .status(401)
          .json({ success: false, message: 'Password does not match' });
      }

      await user.update(req.body);

      const { id, name } = await User.findByPk(req.params.id);

      return res.json({ success: true, user: id, name });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findOne({
        where: { id },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      user.destroy({
        where: { id },
      });

      return res.json({
        success: true,
        message: 'User deleted',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};
