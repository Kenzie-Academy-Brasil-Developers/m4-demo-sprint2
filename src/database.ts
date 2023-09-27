import { Client } from "pg";

export const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
})

const createTables = async () => {
    try{
        const queryString = `
            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                title VARCHAR(100) NOT NULL,
                content TEXT NOT NULL,
                createdAt DATE NOT NULL
            );
        `
        await client.query(queryString);
        console.log("Tables are ready to work!");
    } catch (error) {
        console.log(error);
    }
}

export const connectDatabase = async () => {
    try {
        await client.connect();
        console.log("Database connected sucessfully");
        await createTables();        
    } catch (error) {
        console.log(error);  
    }
}

