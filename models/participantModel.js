const mongoose = require("mongoose");

const participantSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a Name"],
    },
     
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Participant", participantSchema);
