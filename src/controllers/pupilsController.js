const Pupil = require('../models/Pupil');
const yup = require('yup');

module.exports = {
    /**
     * get all pupils 
     */
    async index(req, res){
        const pupils = await Pupil.findAll();
        return res,json(pupils);
    },
    /*
    * get one single pupil
    */
    async indexbyid(req, res){
        try{
            const pupil = await Pupil.findOne({
                where: { id: req.params.id, isActive: true}
            });
            if (!pupil) {
                return res.status(404).json({
                    success: false,
                    message: 'Pupil not found',
                });
            }
            res.json(pupil);
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
    async store(req, res){
        try{

            const { name, address} = req.body;
            
            const pupil = await Pupil.create({ name, address, isActive: true});
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
    async update(req, res){
        try{
            const schema = yup.object().shape({
                name: yup.string(),
                address: yup.string()
            });

            if (!(await schema.isValid(req.body))){
                return res
                .status(400)
                .json({ success: false, message: 'Validation fails' });
            }
            const pupil = await Pupil.findOne({
                where: { id: req.params.id, isActive: true}
            });
            if(pupil){
                await pupil.update(req.body);
                //name and address
                const { id, name, address } = await User.findByPk(req.params.id);
                return res.json({ success: true, user: { id, name, address } });
            }else{
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
    async delete(req, res){
        try{
            const pupil = await Pupil.findOne({
                where: { id: req.params.id, isActive: true}
            });
            if(pupil){
                await pupil.destroy()
                const pupil_verify = await Pupil.findOne({
                    where: { id: req.params.id, isActive: true}
                });
                if(pupil_verify){
                    return res.status(404).json({
                        success: false,
                        message: 'Pupil cannot be deleted',
                    });
                }
                return res.json({ success: true, user: { id, name, address } });
            }else{
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
    }
}