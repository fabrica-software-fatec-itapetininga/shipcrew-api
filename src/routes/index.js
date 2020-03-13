const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

/**
 * Authentication
 */
router.post('/signin', usersController.signin);

/**
 * Users routes
 */
router.get('/users', usersController.index);
router.get('/users/:id', usersController.show);
router.post('/users', usersController.store);
router.patch('/users/:id', usersController.update);
router.delete('/users/:id', usersController.destroy);

module.exports = router;
