const Participant = require("../models/Participant");

// Save a new participant
exports.saveParticipant = async (req, res) => {
  const { name, mobile } = req.body;

  try {
    // Check if a participant with the same mobile number already exists
    const existingParticipant = await Participant.findOne({ mobile });
    if (existingParticipant) {
      return res.status(400).json({ message: "Mobile Number Already in use" });
    }

    const newParticipant = new Participant({ name, mobile });
    await newParticipant.save();
    res.status(201).json({
      message: "Participant registered successfully!",
      participantId: newParticipant._id,
    });
  } catch (error) {
    console.error("Error registering participant:", error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

// Save participant answers
exports.saveAnswers = async (req, res) => {
  const { participantId, answers } = req.body;

  try {
    const participant = await Participant.findById(participantId);
    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    participant.answers.push(...answers); // Add new answers to the existing array
    await participant.save();

    res.status(200).json({ message: "Answers saved successfully!" });
  } catch (error) {
    console.error("Error saving answers:", error);
    res.status(500).json({
      message:
        "An error occurred while saving answers. Please try again later.",
    });
  }
};
