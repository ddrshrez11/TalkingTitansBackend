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
    address: "req.body.address",
    phone: "req.body.phone",
    email: "yunipshrestha@gmail.com",
    age: "req.body.age",
    eduLevel: "req.body.eduLevel",
    eduInstitution: "req.body.eduInstitution",
    participated: "req.body.participated",
    language: "req.body.language",
  };
  await Participant.find()
    .sort({ pId: -1 })
    .limit(1)
    .then((data) => {
      newData.pId = data[0].pId + 1;
      console.log(data[0].pId);
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
        pId: participant.pId,
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
    res.setHeader("Content-Range", "partipants 0-24/319");
    // res.setHeader("Content-Range", participants.length);
    res.send(participantsMap);
  });
});

/**
 * @desc Get one participants
 * @route GET /api/:id
 * @access Protected
 */
const getParticipant = asyncHandler(async (req, res) => {
  Participant.findById(req.params.id, function (err, participant) {
    res.json({ ...participant, id: req.params.id });
  }).lean();
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
    paid: req.body.paid,
    attendMentorship: req.body.attendMentorship,
  };
  await Participant.find()
    .sort({ pId: -1 })
    .limit(1)
    .then((data) => {
      newData["pId"] = data[0].pId + 1;
      console.log(data[0].pId);
    });
  if (newData.pId === undefined) {
    newData["pId"] = 1111;
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
