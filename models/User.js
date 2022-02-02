const { Schema, model } = require("mongoose");

const UserSchema = Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 8,
    },
    telephone: {
      type: String,
      required: true,
    },
    program: {
      type: Object,
      default: {}
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    conversations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Conversation",
      },
    ],
    role: {
      type: String,
      default: "volunteer"
    },
    distanciel: {
      type: Boolean,
      default: false
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cours",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", UserSchema);

module.exports = User;
