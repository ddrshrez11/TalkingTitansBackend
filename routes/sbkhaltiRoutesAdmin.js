const express = require("express");
const router = express.Router();
const {
  newParticipant,
  updateParticipant,
  deleteParticipant,
  getAllParticipants,
  getParticipant,
  sendmail,
} = require("../controllers/paymentMethod/sbkhaltiController");

router.get("/", getAllParticipants);
router.post("/", newParticipant);
router
  .route("/:id")
  .get(getParticipant)
  .put(updateParticipant)
  .delete(deleteParticipant);
module.exports = router;
