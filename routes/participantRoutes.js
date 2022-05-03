const express = require("express");
const router = express.Router();
const {
  getParticipants,
  newParticipant,
  updateParticipant,
  deleteParticipant,
} = require("../controllers/participantController");

router.get("/all", getParticipants);

router.post("/", newParticipant);

router.route("/:id").put(updateParticipant).delete(deleteParticipant);

module.exports = router;
