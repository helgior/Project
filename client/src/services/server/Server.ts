import md5 from "md5";
import CONFIG from "../../config";
import Store from "../store/Store";
import {
  TAnswer,
  TBanner,
  TError,
  TMessagesResponse,
  TUser,
  TNews,
  TAppeal,
} from "./types";

const { CHAT_TIMESTAMP, HOST } = CONFIG;

class Server {
  HOST = HOST;
  store: Store;
  chatInterval: NodeJS.Timer | null = null;
  showErrorCb: (error: TError) => void = () => {};

  constructor(store: Store) {
    this.store = store;
  }

  // посылает запрос и обрабатывает ответ
  private async request<T>(
    method: string,
    params: { [key: string]: string } = {}
  ): Promise<T | null> {
    try {
      params.method = method;
      const token = this.store.getToken();
      if (token) {
        params.token = token;
      }
      const response = await fetch(
        `${this.HOST}/?${Object.keys(params)
          .map((key) => `${key}=${params[key]}`)
          .join("&")}`
      );
      const answer: TAnswer<T> = await response.json();
      if (answer.result === "ok" && answer.data) {
        return answer.data;
      }
      answer.error && this.setError(answer.error);
      return null;
    } catch (e) {
      console.log(e);
      this.setError({
        code: 9000,
        text: "Unknown error",
      });
      return null;
    }
  }

  private setError(error: TError): void {
    this.showErrorCb(error);
  }

  showError(cb: (error: TError) => void) {
    this.showErrorCb = cb;
  }

  async login(login: string, password: string): Promise<boolean> {
    const rnd = Math.round(Math.random() * 100000);
    const hash = md5(password + rnd);
    const user = await this.request<TUser>("login", {
      login,
      hash,
      rnd: `${rnd}`,
    });
    if (user) {
      localStorage.setItem("token", user.token);
      this.store.setUser(user);
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem("token");
    return !!token;
  }

  logout(): void {
    localStorage.removeItem("token");
    this.store.clearUser();
  }

  async registration(
    login: string,
    password: string,
    name: string,
    surname: string,
    role: "user" | "admin" | "executor"
  ): Promise<boolean | null> {
    return this.request<boolean>("registration", {
      login,
      password,
      name,
      surname,
      role,
    });
  }

  sendMessage(message: string): void {
    this.request<boolean>("sendMessage", { message });
  }

  async getMessages(): Promise<TMessagesResponse | null> {
    const hash = this.store.getChatHash();
    const result = await this.request<TMessagesResponse>("getMessages", {
      hash,
    });
    if (result) {
      this.store.setChatHash(result.hash);
      return result;
    }
    return null;
  }

  startChatMessages(cb: (hash: string) => void): void {
    this.chatInterval = setInterval(async () => {
      const result = await this.getMessages();
      if (result) {
        const { messages, hash } = result;
        this.store.addMessages(messages);
        cb(hash);
      }
    }, CHAT_TIMESTAMP);
  }

  stopChatMessages(): void {
    if (this.chatInterval) {
      clearInterval(this.chatInterval);
      this.chatInterval = null;
      this.store.clearMessages();
    }
  }

  getBanners(): Promise<TBanner[] | null> {
    return this.request<TBanner[]>("getBanners");
  }
  addBanner(
    title: string,
    text: string,
    image: string,
    url: string
  ): Promise<boolean | null> {
    return this.request<boolean>("addBanner", { title, text, image, url });
  }
  deleteBanner(id: number): Promise<boolean | null> {
    return this.request<boolean>("deleteBanner", { id: id.toString() });
  }
  updateBanner(id: number, hidden: boolean): Promise<boolean | null> {
    return this.request<boolean>("updateBanner", {
      id: id.toString(),
      hidden: hidden.toString(),
    });
  }
  setBannerOrder(id: number, priority: number): Promise<boolean | null> {
    return this.request<boolean>("setBannerOrder", {
      id: id.toString(),
      priority: priority.toString(),
    });
  }
  getNews(): Promise<TNews[] | null> {
    return this.request<TNews[]>("getNews");
  }

  addNews(title: string, text: string, image: string): Promise<boolean | null> {
    return this.request<boolean>("addNews", { title, text, image });
  }

  getAppeals(): Promise<TAppeal[] | null> {
    return this.request<TAppeal[]>("getAppeals");
  }

  addAppeal(
    //userSurname: string,
    category: "Сантехника" | "Электрика" | "Функциональность веб-сайта",
    comment: string
  ): Promise<boolean | null> {
    return this.request<boolean>("addAppeal", {
      //userSurname,
      category,
      comment,
    });
  }

  updateAppealStatus(
    appealId: number,
    status: string
  ): Promise<boolean | null> {
    return this.request<boolean>("updateAppealStatus", {
      appealId: appealId.toString(),
      status,
    });
  }

  assignExecutor(
    appealId: number,
    executorId: number
  ): Promise<boolean | null> {
    return this.request<boolean>("assignExecutor", {
      appealId: appealId.toString(),
      executorId: executorId.toString(),
    });
  }

  deleteAppeal(appealId: number): Promise<boolean | null> {
    return this.request<boolean>("deleteAppeal", {
      appealId: appealId.toString(),
    });
  }
}

export default Server;
