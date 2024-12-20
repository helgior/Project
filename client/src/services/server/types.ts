import { type } from "os" ;
import datetime from "react-datetime";

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

export type TRequest = {
    id: number;
    user_id: number;
    category_id: number;
    flat_id: number;
    status_id: number;
    description: string;
    priority: 'high' | 'medium' | 'low';
    date: datetime;
}

export type TStatus = {
    id: number;
    name: string;
    type: string;
}