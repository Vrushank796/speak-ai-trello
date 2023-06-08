const express = require('express');
const jwt = require('jsonwebtoken');
var http = require('http');
var OAuth = require('oauth').OAuth;
var url = require('url');
const router = express.Router();
const AuthCtrl = require('../controllers/auth.controller');

/*
/     OAuth Setup and Functions
*/
const requestURL = 'https://trello.com/1/OAuthGetRequestToken';
const accessURL = 'https://trello.com/1/OAuthGetAccessToken';
const authorizeURL = 'https://trello.com/1/OAuthAuthorizeToken';
const appName = 'Speak Ai';
const scope = 'read,write,account';
const expiration = 'never';

// Be sure to include your key and secret in 🗝.env ↖️ over there.
// You can get your key and secret from Trello at: https://trello.com/app-key
const key = process.env.TRELLO_KEY;
const secret = process.env.TRELLO_OAUTH_SECRET;

// Trello redirects the user here after authentication
const loginCallback = `http://localhost:8000/api/auth/callback`;

// You should have {"token": "tokenSecret"} pairs in a real application
// Storage should be more permanent (redis would be a good choice)
const oauth_secrets = {};

const oauth = new OAuth(
  requestURL,
  accessURL,
  key,
  secret,
  '1.0A',
  loginCallback,
  'HMAC-SHA1'
);

const login = function (request, response) {
  oauth.getOAuthRequestToken(function (error, token, tokenSecret, results) {
    oauth_secrets[token] = tokenSecret;
    response.redirect(
      `${authorizeURL}?oauth_token=${token}&name=${appName}&scope=${scope}&expiration=${expiration}`
    );
  });
};

let token, tokenSecret;

var callback = function (req, res) {
  const query = url.parse(req.url, true).query;
  const token = query.oauth_token;
  const tokenSecret = oauth_secrets[token];
  const verifier = query.oauth_verifier;
  oauth.getOAuthAccessToken(
    token,
    tokenSecret,
    verifier,
    function (error, accessToken, accessTokenSecret, results) {
      // In a real app, the accessToken and accessTokenSecret should be stored
      oauth.getProtectedResource(
        'https://api.trello.com/1/members/me',
        'GET',
        accessToken,
        accessTokenSecret,
        async function (error, data, response) {
          // Now we can respond with data to show that we have access to your Trello account via OAuth
          let jsonData = JSON.parse(data);

          //debug
          console.log(
            jsonData.fullName,
            jsonData.username,
            jsonData.id,
            jsonData.email,
            accessToken,
            accessTokenSecret
          );

          try {
            const savedUser = await AuthCtrl.apiCreateUser(
              jsonData,
              accessToken
            );
            const token = jwt.sign(
              { id: savedUser.id, username: savedUser.username },
              process.env.SECRET_KEY
            );
            console.log(token);

            res.cookie('loginToken', token);

            // res.status(200).json({
            //   success: true,
            //   message: 'User saved successfully',
            //   // user: savedUser,
            //   token: token,
            // });

            res.redirect(307, 'http://localhost:4200/cards');
          } catch (error) {
            if (error.statusCode) {
              res.status(error.statusCode).json(error);
            } else {
              res.status(500).json({ error: error.message });
            }
          }
        }
      );
    }
  );
};

router.get('/login', function (request, response) {
  console.log(`GET '/login' ${Date()}`);
  login(request, response);
});

router.get('/callback', function (request, response) {
  console.log(`GET '/callback' ${Date()}`);
  callback(request, response);
});

// router.get('/login', (req, res) => {
//   userController.saveUser(req, res).then((data) => res.json(data));
// });

module.exports = router;
