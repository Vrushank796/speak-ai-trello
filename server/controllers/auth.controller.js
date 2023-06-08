// const User = require('../models/users');
const AuthService = require('../services/AuthService');

module.exports = class authController {
  //save user details in database
  static async apiCreateUser(userData, accessToken) {
    try {
      const savedUser = await AuthService.createUser(userData, accessToken);

      return savedUser;
    } catch (error) {
      console.log(error);
    }
  }
};
