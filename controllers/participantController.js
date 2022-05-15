const asyncHandler = require("express-async-handler");
const Participant = require("../models/participantModel");
const { sendNewUserEmail } = require("../config/mail");

/**
 * @desc Get all participants
 * @route GET /api/all
 * @access Protected
 */
const getParticipants = asyncHandler(async (req, res) => {
  const participants = await Participant.find();
  res.status(200).json(participants);
});

const sendmail = asyncHandler(async (req, res) => {
  const newData = {
    name: "req.body.name",
    email: "req.body.email",
    address: "req.body.address",
    phone: "req.body.phone",
    eduInstitution: "req.body.eduInstitution",
    eduLevel: "req.body.eduLevel",
    age: "req.body.age",
    participated: "req.body.participated",
    language: "req.body.language",
  };
  const id = sendNewUserEmail(newData);
  res.status(200).json(id);
});

const getAllParticipants = asyncHandler(async (req, res) => {
  Participant.find({}, (err, participants) => {
    var participantsMap = [];

    participants.forEach(function (participant) {
      participantsMap.push({
        id: participant._id,
        name: participant.name,
        email: participant.email,
        address: participant.address,
        phone: participant.phone,
        eduLevel: participant.eduLevel,
        eduInstitution: participant.eduInstitution,
        age: participant.age,
        participated: participant.participated,
        language: participant.language,
      });
    });
    res.setHeader("Content-Range", participants.length);
    res.send(participantsMap);
  });
});

/**
 * @desc Get one participants
 * @route GET /api/:id
 * @access Protected
 */
const getParticipant = asyncHandler(async (req, res) => {
  Participant.findById({ _id: req.params.id }, function (err, participant) {
    res.send(participant);
  });
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
  const newData = {
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    eduInstitution: req.body.eduInstitution,
    eduLevel: req.body.eduLevel,
    age: req.body.age,
    participated: req.body.participated,
    language: req.body.language,
  };
  sendNewUserEmail(newData);
  const participant = await Participant.create(newData);
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
  res.status(200).json({ id: participant._id, ...updatedParticipant });
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
  getParticipant,
  getAllParticipants,
  newParticipant,
  updateParticipant,
  deleteParticipant,
  sendmail,
};
