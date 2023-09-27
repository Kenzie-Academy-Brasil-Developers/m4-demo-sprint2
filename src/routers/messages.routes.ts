import { Router } from "express";
import { createMessage, getMessages, getOneMessage } from "../logic";
import { isCreateBodyValid } from "../middleware/isCreateBodyValid";
import { isMessageIdValid } from "../middleware/isMessageIdValid";

export const messagesRoutes = Router();

messagesRoutes.get("/:id", isMessageIdValid, getOneMessage);
messagesRoutes.get("/", getMessages);
messagesRoutes.post("/", isCreateBodyValid, createMessage);