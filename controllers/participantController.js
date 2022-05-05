const asyncHandler = require("express-async-handler");
const Participant = require("../models/participantModel");

/**
 * @desc Get all participants
 * @route GET /api/all
 * @access Protected
 */
const getParticipants = asyncHandler(async (req, res) => {
  const participants = await Participant.find();
  res.status(200).json(participants);
});

/**
 * @desc Add new participants
 * @route POST /api/
 * @access Public
 */
const newParticipant = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a Name field");
  }
  const participant = await Participant.create({
    name: req.body.name,
  });
  res.status(200).json(participant);
});

/**
 * @desc Update participant
 * @route UPDATE /api/:id
 * @access Protected
 */
const updateParticipant = asyncHandler(async (req, res) => {
  const participant = await Participant.findById(req.params.id);
  if (!participant) {
    res.status(400);
    throw new Error("Participant not found");
  }
  // ! TODO - only update if logged in
  // const user = await User.findById(req.user.id);

  // //check for user
  // if (!user) {
  //   res.status(401);
  //   throw new Error("User not found.");
  // }

  // //make sure user in loggedin user matches p
  // if (participant.user.toString() !== user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }
  const updatedParticipant = await Participant.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedParticipant);
});

/**
 * @desc Delete participant
 * @route DELETE /api/:id
 * @access Protected
 */
const deleteParticipant = asyncHandler(async (req, res) => {
  const participant = await Participant.findById(req.params.id);
  if (!participant) {
    res.status(400);
    throw new Error("Participant not found.");
  }

  // ! TODO - only delete if logged in
  // const user = await User.findById(req.user.id);

  // //check for user
  // if (!user) {
  //   res.status(401);
  //   throw new Error("User not found.");
  // }

  // //make sure user in loggedin user matches p
  // if (participant.user.toString() !== user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }

  await participant.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getParticipants,
  newParticipant,
  updateParticipant,
  deleteParticipant,
};
