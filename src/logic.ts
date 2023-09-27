import { Request, Response } from "express";
import { client } from "./database";
import { QueryConfig } from "pg";

export const getOneMessage = async (req: Request, res: Response) => {
    res.status(200).json(res.locals.message);
}

export const getMessages = async (req: Request, res: Response) => {
    const queryString = `SELECT * FROM messages;`

    const query = await client.query(queryString);

    res.status(200).json({ count: query.rowCount, messages: query.rows});
}

export const createMessage = async (req: Request, res: Response) => {
   const date = new Date();  

   const queryString = `INSERT INTO messages (title, content, createdAt) 
        VALUES ($1, $2, $3)
        RETURNING *;    
    `;

   const queryConfig: QueryConfig = {
    text: queryString,
    values: [req.body.title, req.body.content, date]
   } 

   const query = await client.query(queryConfig);

   return res.status(200).json(query.rows[0]);
   //client.query(``);
};

// Limpeza de tabela
/*
export const deleteAll = async (req: Request, res: Response) => {
    const queryString = `DELETE FROM messages;`
    await client.query(queryString);
    return res.status(204);
}
*/