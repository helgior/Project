import React, { useContext, useRef } from "react";
import { ServerContext } from "../../App";
import { IBasePage, PAGES } from "../PageManager";

import "./Registration.scss";
import Footer from "../../components/Footer/Footer";
import Menu from "../../components/Menu/Menu";
import { InputType, useFormattedInput } from "../../hooks/useFormattedInput";
import { validators } from "../../utils/validators";

const Registration: React.FC<IBasePage> = ({ setPage }) => {
  const server = useContext(ServerContext);
  const nameRef = useFormattedInput(validators[InputType.Name]);
  const surnameRef = useFormattedInput(validators[InputType.Name]);
  const phoneRef = useFormattedInput(validators[InputType.Phone]);
  const passwordRef = useRef<HTMLInputElement>(null);

  const registrationHandler = async () => {
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

      const success = await server.registration(login, password, name, surname, "user");

      if (success) {
        setPage(PAGES.LOGIN);
      }
    }
  };

  return (
    <>
      <Menu setPage={setPage} />
      <main className="signAction">
        <div className="wrapper">
          <div className="signAction__container">
            <h1 className="title--2">Регистрация</h1>
            <div className="signAction__form signUp__form">
              <div className="form__block">
                <label className="text--bold">Имя</label>
                <input
                  ref={nameRef}
                  className="text--bold form__input"
                  placeholder="Введите Ваше имя"
                />
              </div>
              <div className="form__block">
                <label className="text--bold">Фамилия</label>
                <input
                  ref={surnameRef}
                  className="text--bold form__input"
                  placeholder="Введите Вашу фамилию"
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
              <div className="form__block">
                <label className="text--bold">Телефон</label>
                <input
                  ref={phoneRef}
                  className="text--bold form__input"
                  placeholder="+7 9** *** - ** - **"
                />
              </div>
              <button
                className="btn form__button"
                onClick={registrationHandler}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer setPage={setPage} />
    </>
  );
};

export default Registration;
