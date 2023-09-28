export interface IMessage{
    id: number;
    title: string;
    content: string;
    createdat: Date;
}

/*
interface IMessageUpdateData{
    title?: string;
    content?: string;
}
*/

export type TMessageUpdateData = Partial<Pick<IMessage, 'title' | 'content'>>;

export interface IField{
    key: string;
    required?: boolean;
    min?: number;
    max?: number;
    regex?: {
        expression: RegExp,
        message: string;
    },
    type?: string;
}