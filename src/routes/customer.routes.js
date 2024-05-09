const express = require('express');
const user_controller = require('../controller/customer.controller');

const routes = express.Router();

// auth Routes is here
routes.post('/api/customers/register', user_controller.register_users);

module.exports = routes;
