import React, { useContext } from "react";
import { StoreContext } from "../../App";
import { IBasePage, PAGES } from "../../pages/PageManager";

import './Footer.scss';

const Footer: React.FC<IBasePage> = (props: IBasePage) => {
  const { setPage } = props;
  const store = useContext(StoreContext);
  const user = store.getUser();

  return (
    <footer className="footer">
      <div className="wrapper">
        <div className="footer__container">
          <div className="footer__logo">
            <a href="/" className="logo">
              <img src="/assets/images/logo.png" alt="logo" />
            </a>
            <span className="text--support">
              Транспортная компания КРЕДОТРЕЙД
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
