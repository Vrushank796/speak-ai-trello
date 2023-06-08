const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//users collection schema in speakAiDB database
const cardSchema = new Schema(
  {
    id: String,
    title: String,
    description: String,
    creationDate: String,
  },
  { collection: 'cards' }
);

//exporting the Users model
module.exports = mongoose.model('Card', cardSchema);
