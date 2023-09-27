import "dotenv/config";
import express from "express";
import { connectDatabase } from "./database";
import { messagesRoutes } from "./routers/messages.routes";

const app = express();

app.use(express.json());

app.use("/messages", messagesRoutes);

const PORT = 3000;

app.listen(PORT, async () => {    
    console.log(`API started sucessfully in port ${PORT}`);
    connectDatabase();
})