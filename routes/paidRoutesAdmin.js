const express = require("express");
const router = express.Router();
const {
  newParticipant,
  updateParticipant,
  deleteParticipant,
  getAllParticipants,
  getParticipant,
} = require("../controllers/paymentMethod/paidController");

router.get("/", getAllParticipants);
router.post("/", newParticipant);
router
  .route("/:id")
  .get(getParticipant)
  .put(updateParticipant)
  .delete(deleteParticipant);
module.exports = router;
