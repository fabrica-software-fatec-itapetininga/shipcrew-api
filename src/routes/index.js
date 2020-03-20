const express = require('express');

const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');

const authMiddleware = require('../middlewares/auth');

const routes = express.Router();
/**
 * Authentication
 */
routes.post('/signin', authController.store);

routes.post('/users', usersController.store); // TEMP

routes.use(authMiddleware);

/**
 * Users routes
 */
routes.get('/users', usersController.index);
routes.get('/users/:id', usersController.show);
routes.patch('/users/:id', usersController.update);
routes.delete('/users/:id', usersController.destroy);

module.exports = routes;
