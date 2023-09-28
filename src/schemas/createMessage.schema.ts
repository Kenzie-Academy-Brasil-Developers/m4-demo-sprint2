import { IField } from "../interfaces";

export const createMessageSchema: IField[] = [
   {
      key: "title",
      required: true,
      type: "string",
      max: 100,
   },
   {
     key: "content",
     required: true,
     type: "string"
   }
];
