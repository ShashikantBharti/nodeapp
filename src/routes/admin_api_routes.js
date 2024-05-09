const express = require('express');
const admin_controller = require('../controller/Admin/auth');

const routes = express.Router();

routes.get('/admin/dashboard/login', admin_controller.admin_login);

module.exports = routes;
