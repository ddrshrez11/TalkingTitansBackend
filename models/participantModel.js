const mongoose = require("mongoose");

const participantSchema = mongoose.Schema(
  {
    p_id: {
      type: Number,
      required: [true, "Please provide Participant ID"],
    },
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
    paid: {
      type: Boolean,
      default: false,
    },
    attendMentorship: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Participant", participantSchema);
