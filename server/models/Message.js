const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    recipient: {
      type: String,
      required: [true, "Please enter a recipient"],
    },
    from: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please enter a title"],
    },
    body: {
      type: String,
      required: [true, "Please enter a text"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
