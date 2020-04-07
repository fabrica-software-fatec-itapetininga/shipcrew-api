const Pupil = require('../models/Pupil');
const yup = require('yup');

module.exports = {
  /**
   * get all pupils
   */
  async index(req, res) {
    const pupils = await Pupil.findAll();
    return res.json({ success: true, pupils });
  },

  /*
   * get one single pupil
   */
  async show(req, res) {
    try {
      const pupil = await Pupil.findOne({
        where: { id: req.params.id },
      });

      if (!pupil) {
        return res.status(404).json({
          success: false,
          message: 'Pupil not found',
        });
      }

      res.json({ success: true, pupil });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  /**
   * create pupil
   */
  async store(req, res) {
    try {
      const schema = yup.object().shape({
        name: yup.string().required(),
        integrationDate: yup.date().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ success: false, message: 'Validation fails' });
      }

      const { name, integrationDate } = req.body;
      const [firstname] = name.split(' ');

      const pupil = await Pupil.create({
        name,
        integrationDate,
        isActive: true,
        avatar: `https://api.adorable.io/avatars/285/${firstname.toLowerCase()}.png`,
      });
      return res.json(pupil);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  /*
   * Patch pupil
   */
  async update(req, res) {
    try {
      const schema = yup.object().shape({
        name: yup.string(),
        integrationDate: yup.date(),
        numPresences: yup.number(),
        numAbsences: yup.number(),
        isActive: yup.bool(),
      });

      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ success: false, message: 'Validation fails' });
      }

      const pupil = await Pupil.findOne({
        where: { id: req.params.id },
      });

      if (pupil) {
        await pupil.update(req.body);
        const pupilData = await Pupil.findByPk(req.params.id);
        return res.json({
          success: true,
          user: pupilData,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'Pupil not found',
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  /*
   * Delete pupil
   */
  async delete(req, res) {
    try {
      const pupil = await Pupil.findOne({
        where: { id: req.params.id },
      });

      if (pupil) {
        await pupil.destroy();
        const pupilVerify = await Pupil.findOne({
          where: { id: req.params.id, isActive: true },
        });

        if (pupilVerify) {
          return res.status(400).json({
            success: false,
            message: 'Pupil cannot be deleted',
          });
        }

        return res.json({ success: true, message: 'Pupil deleted' });
      } else {
        return res.status(404).json({
          success: false,
          message: 'Pupil not found',
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};
