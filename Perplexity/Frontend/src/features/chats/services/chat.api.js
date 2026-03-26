import axios from 'axios';


const api=axios.create({
    baseURL:"http://localhost:3000/api/chats",
    withCredentials:true
});

async function sendMessage(message,chatId){
    try{
        const response=await api.post("/messages",{
            message,
            chatId
        });
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}

async function getMessage(chatId){
    try{
        const response=await api.get(`/get-messages/${chatId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
}

async function getChatId(){
    try{
        const response=await api.get(`/get-chat-id`);
        return response.data;
    } catch (error) {
        console.error('Error fetching chat ID:', error);
        throw error;
    }
}

async function getChat(chatId){
    try{
        const response=await api.get(`/get-chat/${chatId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching chat:', error);
        throw error;
    }
}


async function deleteChat(chatId){
    try{
        const response=await api.get(`/delete-chat/${chatId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting chat:', error);
        throw error;
    }
}

export { sendMessage, getMessage, getChatId, getChat, deleteChat };