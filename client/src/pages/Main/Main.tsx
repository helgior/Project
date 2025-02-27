import React, { useContext, useEffect, useState } from "react";
import CONFIG from "../../config";
import { ServerContext } from "../../App";
import { IBasePage } from "../PageManager";
import "./Main.scss";
import Menu from "../../components/Menu/Menu";
import Footer from "../../components/Footer/Footer";
import FAQComponent from "../../components/FAQComponent/FAQComponent";
import BannerComponent from "../../components/BannerComponent/BannerComponent";

const Main: React.FC<IBasePage> = ({ setPage }) => {
  const server = useContext(ServerContext);
  const [banners, setBanners] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    (async () => {
      const bannersRes = await server.getBanners();
      if (bannersRes) {
        setBanners(bannersRes.filter((banner) => !banner.hidden));
      }
    })();
  }, [server]);

  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);

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