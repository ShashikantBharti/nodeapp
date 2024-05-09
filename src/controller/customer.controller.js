const Customer_schema = require('../models/customer.models');
const Bcrypt = require('bcrypt');
const {
  RegisterValidation,
  LoginValidation,
} = require('../middleware/validation/register.validation');

exports.register_users = async (req, res) => {
  try {
    console.log(req.method);
    if (req.method !== 'POST') {
      return res.status(401).json({
        status: false,
        message: 'Invalid request method',
      });
    }
    let { user_name, password, email } = req.body;
    let ValidatedRecords = await RegisterValidation.validateAsync(req.body);
    if (!ValidatedRecords) {
      return res.status(401).json({
        status: false,
        message: `unauthorize request`,
      });
    }

    if (
      req.body.hasOwnProperty('id') &&
      typeof id !== 'undefined' &&
      id !== ''
    ) {
      // perform the update operation here
      let updateUsers = await Customer_schema.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      if (!updateUsers && updateUsers.lenght <= 0) {
        return res.status(403).json({
          status: false,
          message: `some error occured`,
        });
      }
      return res.status(202).json({
        status: true,
        message: 'Profile updated sucessfully',
        data: updateUsers,
      });
    }
    // hashing the passwords
    let salt = await Bcrypt.genSalt(10);
    // here hashing the password
    console.log(salt);
    let hash_password = await Bcrypt.hash(ValidatedRecords.password, salt);
    if (!hash_password) {
      return res.status(500).json({
        status: false,
        message: 'Internal server Error',
      });
    }
    // create a instance of database
    let userDataBase = new Customer_schema({
      user_name: ValidatedRecords.user_name,
      user_email: ValidatedRecords.email,
      password: hash_password,
      address: req.body.address,
      mobile_no: req.body.mobile_no,
    });
    // save the users in database;
    let save_users = userDataBase.save();
    if (!save_users) {
      return res.status(403).json({
        status: false,
        message: 'some error occured',
      });
    }
    return res.status(201).json({
      status: true,
      message: 'users created successfully',
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.login_user = async (req, res) => {
  try {
    console.log(req.body);
    if (req.method !== 'POST') {
      return res.status(401).json({
        status: false,
        message: 'Invalid request',
      });
    }
    let validatedRessult = await LoginValidation.validateAsync(req.body);
    if (!validatedRessult) {
      return res.status(400).json({
        status: false,
        message: 'validation error',
      });
    }
    console.log(validatedRessult.password);
    // find result in db
    let result = await Customer_schema.findOne({
      user_email: validatedRessult.email,
    });
    if (!result) {
      return res.status(403).json({
        status: false,
        message: 'wrong credentisl',
      });
    }
    // match the password
    let passwordMatch = Bcrypt.compareSync(
      validatedRessult.password,
      result.password
    );
    if (!passwordMatch) {
      return res.status(403).json({
        status: false,
        message: 'wrong credentials',
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Login success',
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
