const express = require('express');
const routes = express.Router();
const userController = require('../controller/user.controller');

routes.post('/register',userController.register);
routes.post('/login',userController.login);

module.exports = routes;