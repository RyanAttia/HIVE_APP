import Conversation from "../models/conversation.model.js";
import eventEmitter from "../eventEmitter.js";


export const createConversation = async (req, res) => {
  try {
    const { participantIds, isGroup, groupName } = req.body;

    if (!participantIds || participantIds.length < 2) {
      return res
        .status(400)
        .json({ message: "At least two participants required" });
    }

    if (!isGroup) {
      const existing = await Conversation.findOne({
        isGroup: false,
        participants: { $all: participantIds, $size: participantIds.length },
      });
      if (existing) return res.status(200).json(existing);
    }

    const newConversation = new Conversation({
      participants: participantIds,
      isGroup: isGroup || false,
      groupName: groupName || null,
    });

    const savedConversation = await newConversation.save();
    const populatedConversation = await Conversation.findById(savedConversation._id)
      .populate("participants", "_id fullName username gender status");

    eventEmitter.emit("conversationCreated", populatedConversation);

    res.status(201).json(populatedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserConversations = async (req, res) => {
  try {
    const userId = req.user._id;
    const conversations = await Conversation.find({
      participants: userId,
    })
      .populate("participants", "username fullName status")
      .sort({ updatedAt: -1 });

    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
};