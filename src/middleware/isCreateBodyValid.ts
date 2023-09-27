import { NextFunction, Request, Response } from "express";

export const isCreateBodyValid = (req: Request, res: Response, next: NextFunction) => {
    const errors = [];

    if(!req.body.title){
        errors.push("title is required");
    }

    if(req.body.title?.length > 100){
        errors.push("title should not have more than 100 characters")
    }

    if(!req.body.content){
        errors.push("content is required");
    }

    if(errors.length > 0){
        return res.status(409).json(errors);
    }

    return next();
}