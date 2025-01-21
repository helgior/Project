import React, { useContext } from "react";
import { StoreContext } from "../../App";
import { IBasePage, PAGES } from "../../pages/PageManager";

import "./Menu.scss";

import burger from "../../assets/img/burger.svg";
import timeIcon from "../../assets/img/time-icon.svg";
import phoneIcon from "../../assets/img/phone-icon.svg";

const Menu: React.FC<IBasePage> = (props: IBasePage) => {
  const { setPage } = props;
  const store = useContext(StoreContext);
  const user = store.getUser();

  return (
    <header className="header">
      <div className="header__top">
        <div className="wrapper">
          <div className="header__container">
            <div className="header__burger">
              <img src={burger} alt="burger--icon" />
            </div>
            <div className="header__logo--mobile">
              <a
                href="#"
                className="header__logo"
                onClick={() => setPage(PAGES.MAIN)}
              >
                <img src="/assets/images/logo.png" alt="logo" />
              </a>
            </div>
            <div className="header__time">
              <img src={timeIcon} alt="time-icon" className="icon" />
              <p className="text--support time__text">ПН-ВС с 08:00-18:00</p>
            </div>
            <div className="header__phones">
              <div className="header__phone">
                <img src={phoneIcon} alt="phone-icon" className="icon" />
                <a href="tel:" className="text--support phone__text">
                  +7 (343) 389-24-61
                </a>
              </div>
              <div className="header__phone">
                <img src={phoneIcon} alt="phone-icon" className="icon" />
                <a href="tel:" className="text--support phone__text">
                  +7 (929) 215- 02-17
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header__bottom">
        <div className="wrapper">
          <div className="header__container">
            <a
              href="#"
              className="header__logo"
              onClick={() => setPage(PAGES.MAIN)}
            >
              <img src="/assets/images/logo.png" alt="logo" />
            </a>
            <nav className="header__nav">
              <ul className="nav__list">
                <li className="list__item">
                  <a
                    href="#"
                    className="text--main"
                    onClick={() => setPage(PAGES.NEWS)}
                  >
                    Новости
                  </a>
                </li>
                {!user && (
                  <li className="list__item">
                    <a
                      href="#"
                      className="text--main"
                      onClick={() => setPage(PAGES.LOGIN)}
                    >
                      Авторизация
                    </a>
                  </li>
                )}
                {user?.role === "user" && (
                  <li className="list__item">
                    <a
                      href="#"
                      className="text--main"
                      onClick={() => setPage(PAGES.APPEALSUSER)}
                    >
                      Обращения
                    </a>
                  </li>
                )}
                {user?.role === "executor" && (
                  <li className="list__item">
                    <a
                      href="#"
                      className="text--main"
                      onClick={() => setPage(PAGES.APPEALSEXECUTOR)}
                    >
                      Обращения
                    </a>
                  </li>
                )}
                {user?.role === "admin" && (
                  <li className="list__item">
                    <a
                      href="#"
                      className="text--main"
                      onClick={() => setPage(PAGES.ADMIN_PANEL)}
                    >
                      Админ-панель
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Menu;
