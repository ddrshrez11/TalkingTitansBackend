const express = require("express");
const router = express.Router();
const {
  getParticipants,
  newParticipant,
  updateParticipant,
  deleteParticipant,
} = require("../controllers/participantController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/all", protect, getParticipants);

router.post("/", newParticipant);

router
  .route("/:id")
  .put(protect, updateParticipant)
  .delete(protect, deleteParticipant);

module.exports = router;
