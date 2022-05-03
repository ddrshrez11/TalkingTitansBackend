const asyncHandler = require("express-async-handler");

/**
 * @desc Get all participants
 * @route GET /api/all
 * @access Protected
 */
const getParticipants = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get all participants" });
});

/**
 * @desc Add new participants
 * @route POST /api/
 * @access Public
 */
const newParticipant = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a textfield");
  }
  res.status(200).json({ message: "new participant" });
});

/**
 * @desc Update participant
 * @route UPDATE /api/:id
 * @access Protected
 */
const updateParticipant = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `update participant ${req.params.id}` });
});

/**
 * @desc Delete participant
 * @route DELETE /api/:id
 * @access Protected
 */
const deleteParticipant = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `delete participant ${req.params.id}` });
});

module.exports = {
  getParticipants,
  newParticipant,
  updateParticipant,
  deleteParticipant,
};
