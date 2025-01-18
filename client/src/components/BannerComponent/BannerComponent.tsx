import React from "react";
import "./BannerComponent.scss";
import { TBanner } from "../../services/server/types";

interface IBannerProps {
  data: TBanner;
  active: boolean;
}

const BannerComponent: React.FC<IBannerProps> = ({ data, active }) => {
  const { title, text, image, url, hidden } = data;

  if (hidden) return null; // Пропускаем скрытые баннеры

  return (
    <div className={`banner__container ${active ? "active" : ""}`}>
      <div className="banner__info">
        <h1 className="text--1">{title}</h1>
        <p className="text--bold info__text">{text || "Описание отсутствует"}</p>
        {url && (
          <a href={url} className="banner__button">
            Подробнее
          </a>
        )}
      </div>
      <img src={image} alt={title} className="banner__img" />
    </div>
  );
};

export default BannerComponent;
