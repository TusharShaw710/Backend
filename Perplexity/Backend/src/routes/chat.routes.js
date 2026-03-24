import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { getChat, sendMessage,getMessage,getChatId } from '../controllers/chat.controller.js';

const router=express.Router();

/**
 * @route POST /api/chats/messages
 * @desc Get AI response for a user message
 * @access Private
  */
router.post("/messages",authenticateToken,sendMessage);

router.get("/get-chat/:chatId",authenticateToken,getChat);

router.get("/get-messages/:chatId",authenticateToken,getMessage);

router.get("/get-chat-id",authenticateToken,getChatId);

export default router;