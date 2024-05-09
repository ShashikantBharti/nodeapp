exports.admin_login = async (req, res) => {
  res.render('landingPage');
};

// here render the dashboard file
exports.admin_dashboard = async (req, res) => {
  res.render('admin/dashboard');
};
