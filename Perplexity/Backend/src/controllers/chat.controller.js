import { getResponse,getChatTitle } from "../services/ai.service.js";
import messageModel from "../models/message.model.js";
import chatModel from "../models/chat.model.js";

async function sendMessage(req,res){
    try{
        const { message,chatId:chatId } = req.body || {};
        if(!message){
            return res.status(400).json({
                message:"Message is required"
            });
        }

        let title=null,chat=null;

        if(!chatId){
            title=await getChatTitle(message);
            chat=await chatModel.create({
            title:title,
            user:req.user.id
        });
        }else{
            chat= await chatModel.findById(chatId);
        }
        const userMessage=await messageModel.create({
            chat:chatId || chat._id,
            role:"user",
            content:message
        });

        const allUserMessages=await messageModel.find({chat:chatId || chat._id});

        if(!title){
            const chatData = await chatModel.findById(chatId).select("title");
            title = chatData.title;
        }

        const response=await getResponse(allUserMessages);

        if(!response){
            return res.status(500).json({
                message:"Failed to get AI response"
            });
        }

        await messageModel.create({
            chat:chatId || chat._id,
            role:"ai",
            content:response
        });
        res.status(200).json({
            success: true,
            chat:chat,
            aiMessage:response       
        }); 
    }catch(err){
        console.error('Error in sendMessage:', err.message);
        res.status(500).json({
            message: err.message || "Failed to send message"
        });
    }
}

async function getChat(req,res){
    const {chatId}=req.params;

    if(!chatId){
        return res.status(404).json({
            message:"ChatId is required!"
        });
    }

    const chat=await chatModel.find({
        _id:chatId,
        user:req.user.id
    });

    if(!chat){
        return res.status(404).json({
            message:"Chat does not found!"
        })
    }

    res.status(200).json({
        success:true,
        chat:chat
    });
}

async function getMessage(req,res){
    const { chatId }=req.params;
     if(!chatId){
        return res.status(404).json({
            message:"ChatId is required!"
        });
    }

    const messages=await messageModel.find({
        chat:chatId
    });

    if(!messages){
        return res.status(404).json({
            message:"Messages does not found!"
        })
    }

    res.status(200).json({
        success:true,
        messages:messages
    });
}
async function getChatId(req,res){

    const chatIds=await chatModel.find({
        user:req.user.id
    })

    if(!chatIds){
        return res.status(404).json({
            message:"No chat History!"
        })
    }

    res.status(200).json({
        success:true,
        chats:chatIds
    });

}

async function getChatDelete(req,res){

    const { chatId }=req.params;
    if(!chatId){
        return res.status(400).json({
            message:"ChatId is required!"
        });
    }

    const chat=await chatModel.findByIdAndDelete(chatId);

    if(!chat){
        return res.status(404).json({
            message:"Chat does not found!"
        })
    }

    res.status(200).json({
        success:true,
        message:"Chat deleted successfully!"
    });
}

export { sendMessage,getChat,getMessage,getChatId,getChatDelete };