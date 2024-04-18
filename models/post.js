const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  id: String,
  name: String,
  desc: String,
  imgLink: String,
  comments: [
    {
      comment: String,
    },
  ],
});

module.exports = {
  mainModel: model("yunation", postSchema),
  challengeModel: model("yunationChallenge", postSchema),
};
