const { Schema, model } = require("mongoose");
const Cours = require("./Cours")
const Conversation = require("./Conversation")


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
      required: true,
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
      default: "volunteer",
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
UserSchema.pre("findOneAndDelete", async(user)=>{
  await Cours.updateMany({users: user._id},{$pull:{users: user._id}})
})


UserSchema.post("save", async(user)=>{
  const admin = await User.findOne({role:"admin"}).exec()
  const conversation = await new Conversation({$push:{users: [user._id, admin._id]}})
  conversation.save()
})
const User = model("User", UserSchema);

module.exports = User;
