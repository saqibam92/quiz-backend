// const express = require("express");
// const { createParticipant } = require("../controllers/participantController");

// const router = express.Router();

// router.post("/", createParticipant);

// module.exports = router;

const express = require("express");
const router = express.Router();
const participantController = require("../controllers/participantController");

// Participant routes
router.post("/participants", participantController.saveParticipant);

// Answer routes
router.post("/answers", participantController.saveAnswers);

module.exports = router;
