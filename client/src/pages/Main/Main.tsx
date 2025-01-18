import React, { useContext, useEffect, useState } from "react";
import CONFIG from "../../config";
import { ServerContext } from "../../App";
import { useBannerContext } from "../../components/BannerContext/BannerContext";
import { IBasePage } from "../PageManager";

import "./Main.scss";

import Menu from "../../components/Menu/Menu";
import Footer from "../../components/Footer/Footer";
import FAQComponent from "../../components/FAQComponent/FAQComponent";
import BannerComponent from "../../components/BannerComponent/BannerComponent";

const Main: React.FC<IBasePage> = ({ setPage }) => {
  const server = useContext(ServerContext);
  const { banners, setBanners } = useBannerContext();
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    (async () => {
      if (!banners) {
        const bannersRes = await server.getBanners();
        setBanners(bannersRes);
      }
    })();
  }, [banners, server, setBanners]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) =>
        banners ? (prev + 1) % banners.length : 0
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [banners]);

  return (
    <>
      <Menu setPage={setPage} />
      <div className="main">
        <section className="main__window">
          <div className="wrapper">
            <div className="banners">
              {banners?.map((banner, index) => (
                <BannerComponent
                  key={banner.id}
                  data={banner}
                  active={index === currentBanner}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="faq">
          <div className="wrapper">
            <div className="faq__container">
              <h2 className="text--2">Отвечаем на популярные вопросы</h2>
              <div className="faq__list">
                <FAQComponent />
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer setPage={setPage} />
    </>
  );
};

export default Main;
