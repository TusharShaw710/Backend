import { createSlice } from "@reduxjs/toolkit";



const chatSlice=createSlice({
    name:"chat",
    initialState:{
        chats: {},
        currentChatId: null,
        isloading:false,
        error:null
    },
    reducers:{
        createNewChat:(state,action)=>{
            const {chatId,title}=action.payload;
            state.chats[chatId]={
                id:chatId,
                title:title,
                messages:[],
                lastUpdated:Date.now().toString()
            }
        },
        addNewMessage:(state,action)=>{
            const {chatId,message,role}=action.payload;
            state.chats[chatId].messages.push({text:message,role:role});
            state.chats[chatId].lastUpdated=Date.now().toString();
            
        },
        addMessages:(state,action)=>{
            const {chatId,messages}=action.payload;
            if(state.chats[chatId]){
                state.chats[chatId].messages.push(...messages);
                state.chats[chatId].lastUpdated=Date.now().toString();
            }
        },
        setChats:(state,action)=>{
            state.chats=action.payload;
        },
        setCurrentChatId:(state,action)=>{
            state.currentChatId=action.payload;
        },
        setLoading:(state,action)=>{
            state.isloading=action.payload;
        },
        setError:(state,action)=>{
            state.error=action.payload;
        }
    }
})

export const {setChats,setCurrentChatId,setLoading,setError,createNewChat,addNewMessage,addMessages}=chatSlice.actions;

export default chatSlice.reducer;