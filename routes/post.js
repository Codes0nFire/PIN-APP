var mongoose = require("mongoose");

var postSchema = mongoose.Schema({
  title: String,
  description: String,
  image: {
    type: Object,
    default:{
      fileId:"",
      url:""
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
});

module.exports = mongoose.model("post", postSchema);
