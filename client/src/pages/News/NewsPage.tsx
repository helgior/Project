import React, { useContext, useEffect, useState } from "react";
import { ServerContext } from "../../App";
import { TNews } from "../../services/server/types";
import { IBasePage } from "../PageManager";
import CONFIG from "../../config";

import "./NewsPage.scss";
import Footer from "../../components/Footer/Footer";
import Menu from "../../components/Menu/Menu";

const { STATIC } = CONFIG;

const NewsPage: React.FC<IBasePage> = (props: IBasePage) => {
  const { setPage } = props;
  const server = useContext(ServerContext);
  const [news, setNews] = useState<TNews[] | null>(null);

  useEffect(() => {
    (async () => {
      if (!news) {
        const newsRes = await server.getNews();
        setNews(newsRes);
      }
    })();
  }, [news, server]);

  return (
    <>
      <Menu setPage={setPage} />
      <main className="promotions-news">
        <section className="promotions-news-content">
          <div className="wrapper">
            <div className="promotions-news-content__container">
              <h1 className="text--2">Новости</h1>
              <div className="promotions-news-content__cards">
                <article className="promotions-news__card">
                  <div className="card__img">
                    <img src="/assets/images/banner-img.jpg" alt="card-img" />
                  </div>
                  <div className="card__info">
                    <h3 className="text--4 info__title">
                      Скидка 20% на первый заказ!
                    </h3>
                    <p className="text--main info__desc">
                      Акция действует для новых клиентов, до 31 мая 2024 года
                    </p>
                    <div className="info__block">
                      <p className="block__text">1 Июня - 30 сентября</p>
                      <p className="block__text">все города</p>
                    </div>
                    <a href="#" className="info__button">
                      подробнее
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                      >
                        <path
                          d="M5.47559 12H18.4756M13.4756 6L18.7685 11.2929C19.159 11.6834 19.159 12.3166 18.7685 12.7071L13.4756 18"
                          stroke="#26349B"
                          stroke-linecap="round"
                        />
                      </svg>
                    </a>
                  </div>
                </article>
                <article className="promotions-news__card">
                  <div className="card__img">
                    <img src="/assets/images/banner-img.jpg" alt="card-img" />
                  </div>
                  <div className="card__info">
                    <h3 className="text--4 info__title">
                      Скидка 20% на первый заказ!
                    </h3>
                    <p className="text--main info__desc">
                      Акция действует для новых клиентов, до 31 мая 2024 года
                    </p>
                    <div className="info__block">
                      <p className="block__text">1 Июня - 30 сентября</p>
                      <p className="block__text">все города</p>
                    </div>
                    <a href="#" className="info__button">
                      подробнее
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                      >
                        <path
                          d="M5.47559 12H18.4756M13.4756 6L18.7685 11.2929C19.159 11.6834 19.159 12.3166 18.7685 12.7071L13.4756 18"
                          stroke="#26349B"
                          stroke-linecap="round"
                        />
                      </svg>
                    </a>
                  </div>
                </article>
                <article className="promotions-news__card">
                  <div className="card__img">
                    <img src="/assets/images/banner-img.jpg" alt="card-img" />
                  </div>
                  <div className="card__info">
                    <h3 className="text--4 info__title">
                      Скидка 20% на первый заказ!
                    </h3>
                    <p className="text--main info__desc">
                      Акция действует для новых клиентов, до 31 мая 2024 года
                    </p>
                    <div className="info__block">
                      <p className="block__text">1 Июня - 30 сентября</p>
                      <p className="block__text">все города</p>
                    </div>
                    <a href="#" className="info__button">
                      подробнее
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                      >
                        <path
                          d="M5.47559 12H18.4756M13.4756 6L18.7685 11.2929C19.159 11.6834 19.159 12.3166 18.7685 12.7071L13.4756 18"
                          stroke="#26349B"
                          stroke-linecap="round"
                        />
                      </svg>
                    </a>
                  </div>
                </article>
                <article className="promotions-news__card">
                  <div className="card__img">
                    <img src="/assets/images/banner-img.jpg" alt="card-img" />
                  </div>
                  <div className="card__info">
                    <h3 className="text--4 info__title">
                      Скидка 20% на первый заказ!
                    </h3>
                    <p className="text--main info__desc">
                      Акция действует для новых клиентов, до 31 мая 2024 года
                    </p>
                    <div className="info__block">
                      <p className="block__text">1 Июня - 30 сентября</p>
                      <p className="block__text">все города</p>
                    </div>
                    <a href="#" className="info__button">
                      подробнее
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                      >
                        <path
                          d="M5.47559 12H18.4756M13.4756 6L18.7685 11.2929C19.159 11.6834 19.159 12.3166 18.7685 12.7071L13.4756 18"
                          stroke="#26349B"
                          stroke-linecap="round"
                        />
                      </svg>
                    </a>
                  </div>
                </article>
                <article className="promotions-news__card">
                  <div className="card__img">
                    <img src="/assets/images/banner-img.jpg" alt="card-img" />
                  </div>
                  <div className="card__info">
                    <h3 className="text--4 info__title">
                      Скидка 20% на первый заказ!
                    </h3>
                    <p className="text--main info__desc">
                      Акция действует для новых клиентов, до 31 мая 2024 года
                    </p>
                    <div className="info__block">
                      <p className="block__text">1 Июня - 30 сентября</p>
                      <p className="block__text">все города</p>
                    </div>
                    <a href="#" className="info__button">
                      подробнее
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                      >
                        <path
                          d="M5.47559 12H18.4756M13.4756 6L18.7685 11.2929C19.159 11.6834 19.159 12.3166 18.7685 12.7071L13.4756 18"
                          stroke="#26349B"
                          stroke-linecap="round"
                        />
                      </svg>
                    </a>
                  </div>
                </article>
                <article className="promotions-news__card">
                  <div className="card__img">
                    <img src="/assets/images/banner-img.jpg" alt="card-img" />
                  </div>
                  <div className="card__info">
                    <h3 className="text--4 info__title">
                      Скидка 20% на первый заказ!
                    </h3>
                    <p className="text--main info__desc">
                      Акция действует для новых клиентов, до 31 мая 2024 года
                    </p>
                    <div className="info__block">
                      <p className="block__text">1 Июня - 30 сентября</p>
                      <p className="block__text">все города</p>
                    </div>
                    <a href="#" className="info__button">
                      подробнее
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                      >
                        <path
                          d="M5.47559 12H18.4756M13.4756 6L18.7685 11.2929C19.159 11.6834 19.159 12.3166 18.7685 12.7071L13.4756 18"
                          stroke="#26349B"
                          stroke-linecap="round"
                        />
                      </svg>
                    </a>
                  </div>
                </article>
              </div>
              <button
                type="submit"
                className="text--main promotions-news__button"
              >
                смотреть ещё
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer setPage={setPage} />
    </>
  );
};

export default NewsPage;
