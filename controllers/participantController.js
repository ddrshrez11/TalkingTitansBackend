const asyncHandler = require("express-async-handler");
const Participant = require("../models/participantModel");
const {
  sendNewUserNotificationEmail,
  sendTokenNumEmail,
} = require("../config/mail");

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
    email: "yunipshrestha@gmail.com",
    address: "req.body.address",
    phone: "req.body.phone",
    eduInstitution: "req.body.eduInstitution",
    eduLevel: "req.body.eduLevel",
    age: "req.body.age",
    participated: "req.body.participated",
    language: "req.body.language",
  };
  await Participant.find()
    .sort({ p_id: -1 })
    .limit(1)
    .then((data) => {
      newData.p_id = data[0].p_id + 1;
      console.log(data[0].p_id);
      console.log(newData);
    });
  const id = sendNewUserNotificationEmail(newData);
  sendTokenNumEmail(newData);

  res.status(200).json(newData);
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
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    eduLevel: req.body.eduLevel,
    age: req.body.age,
    eduInstitution: req.body.eduInstitution,
    language: req.body.language,
    participated: req.body.participated,
  };
  await Participant.find()
    .sort({ p_id: -1 })
    .limit(1)
    .then((data) => {
      newData["p_id"] = data[0].p_id + 1;
      console.log(data[0].p_id);
    });
  if (newData.p_id === undefined) {
    newData["p_id"] = 1111;
  }
  sendNewUserNotificationEmail(newData);
  sendTokenNumEmail(newData);
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
