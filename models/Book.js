const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let BookSchema = new Schema({
  title: {type: String, required: true},
  commentcount: {type: Number, default: 0},
  comments: [String],
  added_on: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Book', BookSchema);
