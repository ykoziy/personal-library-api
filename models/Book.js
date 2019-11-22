const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let BookSchema = new Schema({
  title: {type: String, required: true},
  commentcount: {type: Number, default: 0},
  comments: [{body: String, posted_on: Date}],
  added_on: {type: Date, default: Date.now} 
});
