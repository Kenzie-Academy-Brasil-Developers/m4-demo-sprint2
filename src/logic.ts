import { Request, Response } from "express";
import { client } from "./database";
import { QueryConfig } from "pg";
import format from "pg-format";
import { IMessage, TMessageUpdateData } from "./interfaces";

export const getOneMessage = async (req: Request, res: Response) => {
    res.status(200).json(res.locals.message);
}

export const getMessages = async (req: Request, res: Response) => {
    let queryConfig: string | QueryConfig;

    console.log(req.query.search);
    
    if(req.query.search){
        const search = '%' + req.query.search + '%';
        queryConfig = format(`SELECT * FROM messages WHERE title ILIKE '%s';`, search);
    } else {
        queryConfig = `SELECT * FROM messages;`
    }   

    const query = await client.query(queryConfig);

    res.status(200).json({ count: query.rowCount, messages: query.rows});
}

export const createMessage = async (req: Request<{}, {}, Pick<IMessage, 'title' | 'content'> ,{}>, res: Response) => {
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

export const deleteMessage = async (req: Request, res: Response) => {
    const queryString = `DELETE FROM messages WHERE id = $1;`;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.params.id]
    }

    await client.query(queryConfig);

    return res.status(204).json();
}

/*
UPDATE messages
SET
    (title, content) = ROW ('Título atualizado 2', 'Conteúdo atualizado 2')
WHERE id = 3
RETURNING *;
*/

// %I - variável para indices
// %L - valores literais

export const updatePartialMessage = async (req: Request, res: Response) => {
    let objectData: TMessageUpdateData = {};
    Object.entries(req.body).forEach(([key, value]) => {
        if(key === "title" || key === "content"){
            if(typeof value === "string"){
                objectData[key] = value;
            }         
        }
    });

    const queryConfig = format(`
        UPDATE messages SET (%I) = ROW (%L) WHERE id = %L RETURNING *;
    `, Object.keys(objectData), Object.values(objectData), req.params.id);

    const query = await client.query(queryConfig);

    return res.status(200).json(query);
}

//PUT
export const updateMessage = async (req: Request, res: Response) => {
    const objectData = {
        title: req.body.title,
        content: req.body.content
    }

    const queryConfig = format(`
        UPDATE messages SET (%I) = ROW (%L) WHERE id = %L RETURNING *;
    `, Object.keys(objectData), Object.values(objectData), req.params.id);

    const query = await client.query(queryConfig);

    return res.status(200).json(query);
}


// Limpeza de tabela
/*
export const deleteAll = async (req: Request, res: Response) => {
    const queryString = `DELETE FROM messages;`
    await client.query(queryString);
    return res.status(204);
}
*/