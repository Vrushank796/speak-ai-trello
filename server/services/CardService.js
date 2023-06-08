const axios = require('axios');

const APIKey = process.env.TRELLO_KEY;
// const secretKey = process.env.SECRET_KEY;

const Card = require('../models/cards');
const AuthService = require('../services/AuthService');

module.exports = class CardService {
  static async getAllCards() {
    try {
      const allCards = await Card.find();
      return allCards;
    } catch (error) {
      console.log(`Could not fetch cards ${error}`);
      return error;
    }
  }

  static async getCardById(cardId) {
    try {
      const card = await Card.findOne({ id: cardId }).exec();
      return card;
    } catch (error) {
      console.log(`Could not fetch cards ${error}`);
      return error;
    }
  }

  static async createCard(token, title, description) {
    try {
      const verifiedUser = await AuthService.verifyUserToken(token);
      const APIToken = verifiedUser.token;

      let url = `https://api.trello.com/1/cards?idList=647d4d14a8308da54b58fe28&key=${APIKey}&token=${APIToken}`;
      const cardData = {
        name: title,
        desc: description,
      };

      const response = await axios
        .post(url, cardData)
        .then(async (response) => {
          console.log('Card created successfully in Trello');

          const jsonCardData = response.data;
          const newCardObj = {
            id: jsonCardData.id,
            title: jsonCardData.name,
            description: jsonCardData.desc,
            creationDate: new Date(),
          };
          const newCard = Card(newCardObj);

          const resp = await newCard.save();
          console.log('Card saved successfully in DB');
          return resp;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async updateCard(token, id, title, description) {
    try {
      const verifiedUser = await AuthService.verifyUserToken(token);
      const APIToken = verifiedUser.token;

      const cardId = id;
      let url = `https://api.trello.com/1/cards/${cardId}?key=${APIKey}&token=${APIToken}`;
      const cardData = {
        name: title,
        desc: description,
      };

      const response = await axios
        .put(url, cardData)
        .then(async (response) => {
          console.log('Updated card successfully in Trello');

          const jsonCardData = response.data;

          const resp = Card.findOneAndUpdate(
            { id: cardId },
            {
              $set: {
                title: jsonCardData.name,
                description: jsonCardData.desc,
              },
            },
            { returnOriginal: false }
          ).exec();

          console.log('Updated card successfully in DB');
          return resp;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async deleteCard(token, id) {
    try {
      const verifiedUser = await AuthService.verifyUserToken(token);
      const APIToken = verifiedUser.token;
      const cardId = id; //Change to id
      let url = `https://api.trello.com/1/cards/${cardId}?key=${APIKey}&token=${APIToken}`;

      const response = await axios
        .delete(url)
        .then(async (response) => {
          console.log('Deleted card successfully in Trello');

          const resp = Card.deleteOne({ id: cardId }).exec();
          console.log('Deleted card successfully in DB');
          return resp;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};
