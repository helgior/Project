import React, { useContext, useRef } from "react";
import { ServerContext } from "../../App";
import { IBasePage, PAGES } from "../PageManager";

import "./Login.scss";
import Footer from "../../components/Footer/Footer";
import Menu from "../../components/Menu/Menu";
import { InputType, useFormattedInput } from "../../hooks/useFormattedInput";
import { validators } from "../../utils/validators";

const Login: React.FC<IBasePage> = ({ setPage }) => {
  const server = useContext(ServerContext);
  const phoneRef = useFormattedInput(validators[InputType.Phone]);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginClickHandler = async () => {
    if (phoneRef.current && passwordRef.current) {
      const login = phoneRef.current.value;
      const password = passwordRef.current.value;

      if (await server.login(login, password)) {
        setPage(PAGES.MAIN);
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
            <div className="signAction__form">
              <div className="form__block">
                <label className="text--bold">Номер телефона</label>
                <input
                  ref={phoneRef}
                  className="text--bold form__input"
                  placeholder="+7 9** *** - ** - **"
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
              <button className="btn form__button" onClick={loginClickHandler}>
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
            </div>
          </div>
        </div>
      </main>
      <Footer setPage={setPage} />
    </>
  );
};

export default Login;
