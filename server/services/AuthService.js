const crypto = require('crypto');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

// const algorithm = 'aes-256-cbc';
// const iv = crypto.randomBytes(16); // Initialization vector

// function encryptAccessTokens(accessToken, accessTokenSecret) {
//   const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
//   let encryptedAccessToken = cipher.update(accessToken, 'utf8', 'hex');
//   encryptedAccessToken += cipher.final('hex');

//   const cipher2 = crypto.createCipheriv(algorithm, secretKey, iv);
//   let encryptedAccessTokenSecret = cipher2.update(
//     accessTokenSecret,
//     'utf8',
//     'hex'
//   );
//   encryptedAccessTokenSecret += cipher2.final('hex');

//   return {
//     encryptedAccessToken,
//     encryptedAccessTokenSecret,
//     iv: iv.toString('hex'),
//   };
// }

// function decryptAccessTokens(
//   encryptedAccessToken,
//   encryptedAccessTokenSecret,
//   iv
// ) {
//   const decipher = crypto.createDecipheriv(
//     algorithm,
//     secretKey,
//     Buffer.from(iv, 'hex')
//   );
//   let accessToken = decipher.update(encryptedAccessToken, 'hex', 'utf8');
//   accessToken += decipher.final('utf8');

//   const decipher2 = crypto.createDecipheriv(
//     algorithm,
//     secretKey,
//     Buffer.from(iv, 'hex')
//   );
//   let accessTokenSecret = decipher2.update(
//     encryptedAccessTokenSecret,
//     'hex',
//     'utf8'
//   );
//   accessTokenSecret += decipher2.final('utf8');

//   return {
//     accessToken,
//     accessTokenSecret,
//   };
// }

module.exports = class AuthService {
  static async verifyUserToken(token) {
    try {
      const decodedToken = jwt.verify(token, secretKey);
      const verifiedUser = await User.findOne({ id: decodedToken.id })
        .lean()
        .exec();
      return verifiedUser;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async createUser(data, accessToken) {
    // const encryptedAccessTokens = encryptAccessTokens(
    //   accessToken,
    //   accessTokenSecret
    // );
    try {
      const userDataObj = {
        id: data.id,
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        token: accessToken,
      };

      const userData = User(userDataObj);

      const validUser = await User.findOne({ id: userData.id }).exec();

      if (validUser == null) {
        //Save user if not exists
        const response = await userData.save();
        console.log('User created successfully');

        return response;
      } else {
        //debug
        console.log('User already exist');
        return validUser;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};
