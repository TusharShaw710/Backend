import { initClient } from "../services/chat.socket";
import { sendMessage,getMessage,getChat,getChatId,deleteChat } from "../services/chat.api";
import { useDispatch } from "react-redux";
import { setLoading,setChats,setCurrentChatId,setError,createNewChat,addNewMessage,addMessages } from "../chat.slice";

const useChat=()=>{
    const dispatch=useDispatch();

    async function handleSendMessage(message,chatId){
        dispatch(setLoading(true));
        try{
            const data=await sendMessage(message,chatId);
            const {chat,aiMessage}=data;
            // Only create chat if it doesn't already exist
            if(!chatId){
                dispatch(createNewChat({
                    chatId:chat._id,
                    title:chat.title
                }));
                chatId = chat._id;
            }
            dispatch(addNewMessage({
                chatId:chatId,
                message:message,
                role:"user"
            }));
            dispatch(addNewMessage({
                chatId:chatId,
                message:aiMessage,
                role:"ai"
            }));

            dispatch(setCurrentChatId(chatId));

        }catch(err){
            console.log(err);
            dispatch(setError("Failed to send message. Please try again."));
        }finally{
            dispatch(setLoading(false));
        }
    }

    async function handleGetChat() {
        dispatch(setLoading(true));
        try {
          const data = await getChatId();
          const { chats } = data;
          const chatMap=chats.reduce((acc,chat)=>{
            acc[chat._id]={
                id:chat._id,
                title:chat.title,
                messages:[],
                lastUpdated:chat.lastUpdated
            };
            return acc;
          },{});
            dispatch(setChats(chatMap));          
        } catch (err) {
          console.log(err);
          dispatch(setError("Failed to get chat. Please try again."));
        } finally {
          dispatch(setLoading(false));
        }
    }

    async function openChat(chatId,chats){
        dispatch(setLoading(true));

        try {
            if(chats[chatId]?.messages.length===0) {
                const {messages}=await getMessage(chatId);
                const formatMessages=messages.map((msg)=>{
                    return {
                        text:msg.content,
                        role:msg.role
                    }
                });

                dispatch(addMessages({
                    chatId:chatId,
                    messages:formatMessages
                }));
            }           
            dispatch(setCurrentChatId(chatId));
        } catch (error) {
            console.log(error);
        }finally{
            dispatch(setLoading(false));
        }
    }

    return { handleSendMessage,initClient,handleGetChat,openChat }
}

export default useChat;