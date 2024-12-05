import { type } from "os";

export type TError = {
    code: number;
    text: string;
}

export type TAnswer<T> = {
    result: 'ok' | 'error';
    data?: T;
    error?: TError;
}

export type TUser = {
    token: string;
    name: string;
    role: 'user' | 'admin' | 'executor'; // Обновите тип роли
}



export type TMessage = {
    message: string;
    author: string;
    created: string;
}

export type TMessages = TMessage[];
export type TMessagesResponse = {
    messages: TMessages;
    hash: string;
}

export type TBanner = {
    id: number;
    title: string;
    text: string | null;
    image: string;
    url: string;
    hidden: boolean;
}


