const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  id: String,
  userId: String, //? User ID, it's secret :D
  name: String,
  desc: String,
  imgLink: String,
  comments: [
    {
      comment: String,
    },
  ],
  accept: Boolean, //? accept for .... queue feature, admin need to accept it first :D
});
const userSchema = new Schema({
  userId: String,
  username: String,
  isQueue: Boolean,
  isAdmin: Boolean,
  isBan: Boolean,
});
module.exports = {
  mainModel: model("yunation", postSchema),
  challengeModel: model("yunationChallenge", postSchema),
  userModel: model("yuyu", userSchema),
};

//* I'm Back :D
