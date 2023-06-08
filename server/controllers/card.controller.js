const { create } = require('lodash');
const CardService = require('../services/CardService');

module.exports = class cardController {
  static async apiGetCards(req, res, next) {
    try {
      const cards = await CardService.getAllCards();
      if (!cards) {
        res.status(404).json('There are no cards added yet!');
      }
      res.status(200).json(cards);
    } catch (error) {
      if (error.statusCode) {
        res.status(error.statusCode).json(error);
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async apiGetCard(req, res, next) {
    try {
      const cardId = req.params.id;
      const card = await CardService.getCardById(cardId);
      if (!card) {
        res.status(404).json('There are no cards added yet!');
      }
      res.status(200).json(card);
    } catch (error) {
      if (error.statusCode) {
        res.status(error.statusCode).json(error);
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async apiCreateCard(req, res, next) {
    try {
      const token = req.cookies.loginToken;
      const title = req.body.title;
      const description = req.body.description;

      const createdCard = await CardService.createCard(
        token,
        title,
        description
      );
      res.status(201).json(createdCard);
    } catch (error) {
      if (error.statusCode) {
        res.status(error.statusCode).json(error);
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async apiUpdateCard(req, res, next) {
    try {
      const token = req.cookies.loginToken;
      const cardId = req.params.id;
      const title = req.body.title;
      const description = req.body.description;
      const updatedCard = await CardService.updateCard(
        token,
        cardId,
        title,
        description
      );
      res.status(200).json(updatedCard);
    } catch (error) {
      if (error.statusCode) {
        res.status(error.statusCode).json(error);
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async apiDeleteCard(req, res, next) {
    try {
      const token = req.cookies.loginToken;
      console.log('Cookies:' + req.cookies.loginToken);
      const cardId = req.params.id;
      const deletedCard = await CardService.deleteCard(token, cardId);
      res.status(200).json(deletedCard);
    } catch (error) {
      if (error.statusCode) {
        res.status(error.statusCode).json(error);
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
};
