const express = require("express");
const router = express.Router();
const {
  getParticipants,
  newParticipant,
  updateParticipant,
  deleteParticipant,
  getAllParticipants,
  getParticipant,
} = require("../controllers/participantController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/all", protect, getParticipants);
router.get("/", getAllParticipants);
// router.get("/", getParticipants);

router.post("/", newParticipant);

router
  .route("/:id")
  .get(getParticipant)
  .put(updateParticipant)
  .delete(deleteParticipant);
module.exports = router;
