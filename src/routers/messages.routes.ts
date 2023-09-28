import { Router } from "express";
import {
   createMessage,
   deleteMessage,
   getMessages,
   getOneMessage,
   updateMessage,
   updatePartialMessage,
} from "../logic";
import { isCreateBodyValid } from "../middleware/isCreateBodyValid";
import { isMessageIdValid } from "../middleware/isMessageIdValid";
import { bodyValidator } from "../middleware/bodyValidator";
import { createMessageSchema } from "../schemas/createMessage.schema";
import { updatePartialMessageSchema } from "../schemas/updatePartialMessage.schema";
import { updateMessageSchema } from "../schemas/updateMessage.schema";

export const messagesRoutes = Router();

messagesRoutes.get("/:id", isMessageIdValid, getOneMessage);
messagesRoutes.get("/", getMessages);
messagesRoutes.post("/", bodyValidator(createMessageSchema), createMessage);
messagesRoutes.delete("/:id", isMessageIdValid, deleteMessage);
messagesRoutes.patch(
   "/:id",
   bodyValidator(updatePartialMessageSchema),
   isMessageIdValid,
   updatePartialMessage
);
messagesRoutes.put("/:id", bodyValidator(updateMessageSchema), isMessageIdValid, updateMessage);
