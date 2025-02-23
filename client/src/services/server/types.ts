import { type } from "os";

export type TError = {
  code: number;
  text: string;
};

export type TAnswer<T> = {
  result: "ok" | "error";
  data?: T;
  error?: TError;
};

export type TUser = {
  token: string;
  surname: string;
  login: string;
  name: string;
  role: "user" | "admin" | "executor";
};

export type TMessage = {
  message: string;
  author: string;
  created: string;
};

export type TMessages = TMessage[];
export type TMessagesResponse = {
  messages: TMessages;
  hash: string;
};

export type TBanner = {
  id: number;
  title: string;
  text: string | null;
  image: string;
  hidden: boolean;
  priority: number;
};

export type TNews = {
  id: number;
  title: string;
  text: string;
  image: string | null;
  date: string;
};

export type TAppeal = {
  status: "В ожидании" | "В работе" | "Завершено" | "Отменен";
  id: number;
  user: TUser;
  executorId: number | null;
  comment: string | null;
  category: "Сантехника" | "Электрика" | "Функциональность веб-сайта";
};

export type TAppealResponse = {
  appeals: TAppeal[];
};

export type TStreet = {
  id: number;
  street_name: string;
  coordinates: string[];
  number_of_houses: number;
  status: boolean;
};
