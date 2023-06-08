const express = require('express');
const router = express.Router();
const cardCtrl = require('../controllers/card.controller');

//get all cards
router.get('/cards', cardCtrl.apiGetCards);

//get card by id
router.get('/card/:id', cardCtrl.apiGetCard);

//create card
router.post('/card', cardCtrl.apiCreateCard);

//update card
router.put('/card/:id', cardCtrl.apiUpdateCard);

//delete card
router.delete('/card/:id', cardCtrl.apiDeleteCard);

module.exports = router;
