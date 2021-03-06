const express = require("express");
const { sendEmail } = require("../config/mail");
const router = express.Router();
const {
  newParticipant,
  updateParticipant,
  deleteParticipant,
  getAllParticipants,
  getParticipant,
  sendmail,
} = require("../controllers/participantControllerAdmin");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", getAllParticipants);
router.get("/send", sendmail);
router.post("/", newParticipant);
router
  .route("/:id")
  .get(getParticipant)
  .put(updateParticipant)
  .delete(deleteParticipant);
module.exports = router;
