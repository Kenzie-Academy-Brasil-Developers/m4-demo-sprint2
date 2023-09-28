import { IField } from "../interfaces";

export const updatePartialMessageSchema: IField[] = [
    {
        key: "title",
        type: "string",
        max: 100,
    },
    {
        key: "content",
        type: "string"
    }
]