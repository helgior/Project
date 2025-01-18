import React, { useContext, useRef } from "react";
import { ServerContext } from "../../App";
import { IBasePage, PAGES } from "../PageManager";

import "./Login.scss";
import Footer from "../../components/Footer/Footer";
import Menu from "../../components/Menu/Menu";
import {
  handlePhoneInput,
  validatePassword,
  validatePhone,
} from "../../services/utils/validation";

const Login: React.FC<IBasePage> = ({ setPage }) => {
  const server = useContext(ServerContext);
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginClickHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginRef.current && passwordRef.current) {
      const login = loginRef.current.value;
      const password = passwordRef.current.value;

      console.log("Login input:", login);
      console.log("Password input:", password);

      if (!validatePhone(login)) {
        alert("Введите корректный номер телефона в формате +7XXXXXXXXXX");
        return;
      }

      if (!validatePassword(password)) {
        alert("Пароль должен быть не менее 5 символов");
        return;
      }

      if (await server.login(login, password)) {
        setPage(PAGES.MAIN);
      } else {
        alert("Неверный логин или пароль");
      }
    }
  };

  return (
    <>
      <Menu setPage={setPage} />
      <main className="signAction">
        <div className="wrapper">
          <div className="signAction__container">
            <h1 className="title--2">Вход в личный кабинет</h1>
            <form
              action=""
              className="signAction__form"
              onSubmit={loginClickHandler}
            >
              <div className="form__block">
                <label className="text--bold">Номер телефона</label>
                <input
                  ref={loginRef}
                  type="text"
                  className="text--bold form__input"
                  placeholder="+7 9** *** - ** - **"
                  onInput={handlePhoneInput}
                />
              </div>
              <div className="form__block">
                <label className="text--bold">Пароль</label>
                <input
                  ref={passwordRef}
                  type="password"
                  className="text--bold form__input"
                  placeholder="**********"
                />
              </div>
              <button className="btn form__button" type="submit">
                Войти
              </button>
              <p className="text--bold form__text">
                Нет учетной записи?
                <a
                  href="#"
                  className="text--bold"
                  onClick={() => setPage(PAGES.REGISTRATION)}
                >
                  Создайте её здесь
                </a>
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer setPage={setPage} />
    </>
  );
};

export default Login;
