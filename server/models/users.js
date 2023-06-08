const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//users collection schema in speakAiDB database
const userSchema = new Schema(
  {
    id: String,
    fullName: String,
    username: String,
    email: String,
    token: String,
  },
  { collection: 'users' }
);

//exporting the Users model
module.exports = mongoose.model('User', userSchema);
