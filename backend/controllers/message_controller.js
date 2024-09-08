import Conversation from "../models/conversation_model.js";

export const send_message = async (req, res) => {
    try {
        const {message} = req.body;
        const { id: receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]},
        });

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }
        const new_message = new Message({
            senderId,
            receiverId,
            message,
        });
        if(new_message){
            conversation.messages.push(new_message._id);
        }
        // SOCKET IO FUNCTIONALITY WILL GO HERE

        // await conversation.save();
        // await new_message.save();

        // this will run in parallel
        await Promise.all([conversation.save(), new_message.save()]);

        res.status(201).json(new_message);

    } catch (error) {
        console.log("Error in send_message controller", error.message);
        res.status(500).json({error: "Internal Server Error"});      
    }
    
};

export const get_messages = async (req, res) => {
    try {
        const { id: user_to_chatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]},
        }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

        if(!conversation) return res.stateus (200).json([]);
        
        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in get_messages controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};