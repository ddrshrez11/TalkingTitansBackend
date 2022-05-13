const mongoose = require("mongoose");

const participantSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a Name"],
    },
    address: {
      type: String,
      required: [true, "Please add a address"],
    },
    phone: {
      type: String,
      required: [true, "Please add a phone"],
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
    },

    age: {
      type: String,
      required: [true, "Please add a age"],
    },
    eduLevel: {
      type: String,
      required: [true, "Please add a eduLevel"],
    },
    eduInstitution: {
      type: String,
      required: [true, "Please add a eduInstitution"],
    },
    language: {
      type: String,
      required: [true, "Please select preferred language"],
    },
    participated: {
      type: String,
      required: [true, "Please select an option"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Participant", participantSchema);
