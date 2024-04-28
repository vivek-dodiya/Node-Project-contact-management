const { name } = require("ejs");
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const contactSchema = mongoose.Schema(
  {
    user_id : {
      type : mongoose.Schema.Types.ObjectId,
      required : true,
      ref : "User"
    },
    name: {
      type: String,
      required: [true, "please add the contact name.."],
    },
    email: {
      type: String,
      required: [true, "please add the contact email address.."],
    },
    phone: {
      type: Number,
      required: [true, "please add the contact phone number.."],
    },
  },
  {
    timestamps:true,
  }
);

module.exports= mongoose.model("contact",contactSchema);
