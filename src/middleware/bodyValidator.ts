import { Request, Response, NextFunction } from "express";
import { IField } from "../interfaces";

export const bodyValidator =
   (fieldList: IField[]) => (req: Request, res: Response, next: NextFunction) => {
      const errors: string[] = [];

      fieldList.forEach((field) => {
         const fieldValue = req.body[field.key];

         if (field.required && !fieldValue) {
            errors.push(`${field.key} is required`);
         } else if (
            req.body[field.key] &&
            field.type &&
            typeof fieldValue !== field.type
         ) {
            errors.push(`${field.key} should be a ${field.type}`);
         } else if (req.body[field.key] && field.min && fieldValue.length < field.min) {
            errors.push(`${field.key} should have at least ${field.min} characters.`);
         } else if (req.body[field.key] && field.max && fieldValue.length > field.max) {
            errors.push(`${field.key} shouldn't have more than ${field.max} characters.`);
         } else if (
            req.body[field.key] &&
            field.regex &&
            !fieldValue.match(field.regex.expression)
         ) {
            errors.push(`${field.key}: ${field.regex.message}`);
         }
      });

      if (errors.length > 0) {
         return res.status(422).json(errors);
      }

      next();
   };
