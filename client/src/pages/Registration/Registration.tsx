import React, { useContext, useRef } from "react";
import { ServerContext } from "../../App";
import { IBasePage, PAGES } from "../PageManager";

import "./Registration.scss";
import Footer from "../../components/Footer/Footer";
import Menu from "../../components/Menu/Menu";
import {
  handleNameInput,
  handlePhoneInput,
  validateName,
  validatePassword,
  validatePhone,
} from "../../services/utils/validation";

const Registration: React.FC<IBasePage> = ({ setPage }) => {
  const server = useContext(ServerContext);
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const registrationHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      nameRef.current &&
      surnameRef.current &&
      phoneRef.current &&
      passwordRef.current
    ) {
      const name = nameRef.current.value;
      const surname = surnameRef.current.value;
      const login = phoneRef.current.value;
      const password = passwordRef.current.value;

      if (!validateName(name) || !validateName(surname)) {
        alert(
          "Имя и фамилия должны содержать только русские буквы и начинаться с заглавной"
        );
        return;
      }

      if (!validatePhone(login)) {
        alert("Введите корректный номер телефона в формате +7XXXXXXXXXX");
        return;
      }

      if (!validatePassword(password)) {
        alert("Пароль должен быть не менее 5 символов");
        return;
      }

      if (
        await server.registration(login, password, name, surname, login, "user")
      ) {
        alert("Регистрация успешна");
        setPage(PAGES.LOGIN);
      } else {
        alert("Ошибка регистрации");
      }
    }
  };

  return (
    <>
      <Menu setPage={setPage} />
      <main className="signAction">
        <div className="wrapper">
          <div className="signAction__container">
            <h1 className="title--2">Регистирация</h1>
            <form
              action=""
              className="signAction__form signUp__form"
              onSubmit={registrationHandler}
            >
              <div className="form__block">
                <label className="text--bold">Имя</label>
                <input
                  ref={nameRef}
                  type="text"
                  className="text--bold form__input"
                  placeholder="Введите Ваше имя"
                  onInput={handleNameInput}
                />
              </div>
              <div className="form__block">
                <label className="text--bold">Фамилия</label>
                <input
                  ref={surnameRef}
                  type="text"
                  className="text--bold form__input"
                  placeholder="Введите Вашу фамилию"
                  onInput={handleNameInput}
                />
              </div>
              <div className="form__block">
                <label className="text--bold">Пароль</label>
                <input
                  ref={phoneRef}
                  type="password"
                  className="text--bold form__input"
                  placeholder="**********"
                />
              </div>
              <div className="form__block">
                <label className="text--bold">Телефон</label>
                <input
                  ref={passwordRef}
                  type="text"
                  className="text--bold form__input"
                  placeholder="+7 9** *** - ** - **"
                  onInput={handlePhoneInput}
                />
              </div>
              <button className="btn form__button" type="submit">Сохранить</button>
            </form>
          </div>
        </div>
      </main>
      <Footer setPage={setPage} />
    </>
  );
};

export default Registration;
