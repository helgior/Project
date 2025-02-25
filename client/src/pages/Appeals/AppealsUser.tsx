import React, { useContext, useState } from "react";
import { StoreContext, ServerContext } from "../../App";
import { IBasePage } from "../PageManager";
import Menu from "../../components/Menu/Menu";
import Footer from "../../components/Footer/Footer";

import "./Appeals.scss";

import closeIcon from "../../assets/img/close-icon.svg";

const mockAppeals = [
  {
    id: 1,
    firstName: "Иван",
    lastName: "Иванов",
    phone: "+7 (900) 123-45-67",
    comment: "Не работает форма регистрации.",
    category: "Функционал сайта",
    status: "В ожидании",
  },
  {
    id: 2,
    firstName: "Мария",
    lastName: "Петрова",
    phone: "+7 (900) 987-65-43",
    comment: "Ошибка при оформлении заказа.",
    category: "Функционал сайта",
    status: "В ожидании",
  },
];

const AppealsUser: React.FC<IBasePage> = (props: IBasePage) => {
  const { setPage } = props;
  const store = useContext(StoreContext);
  const server = useContext(ServerContext);
  const user = store.getUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ["Сантехника", "Электрика", "Функционал сайта"];

  if (user && user.role !== "user") {
    return <div>Доступ запрещен</div>;
  }

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const toggleSelector = () => setIsSelectorOpen((prev) => !prev);

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setIsSelectorOpen(false);
  };

  const addTheAppeal = async () => {
    const response = await server.addAppeal("Сантехника", "ррр");
    if (response) {
        const appealsRes = await server.getAppeals();
        alert('Баннер успешно добавлен');
    } else {
        alert('Ошибка при добавлении баннера');
    }
};

  return (
    <>
      {isModalOpen && (
        <div className="popap popap--active">
          <div className="popap__wrapper">
            <div className="formPopap__content">
              <h3 className="text--4 formPopap__title">Новое обращение</h3>
              <div
                className={`form__select ${isSelectorOpen ? "open" : ""}`}
                onClick={toggleSelector}
              >
                <div className="select__title">
                  <p className="text--main placeholder">
                    {selectedCategory || "Категория:"}
                  </p>
                </div>
                {isSelectorOpen && (
                  <div className="select__options">
                    {categories.map((category) => (
                      <div
                        className="options__item"
                        key={category}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectCategory(category);
                        }}
                      >
                        <span className="text--main">{category}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <textarea
                className="form__textarea"
                placeholder="Комментарий о проблеме"
              ></textarea>
              <button onClick={() => addTheAppeal()}>
                Отправить
              </button>
              <a href="#" className="popap__icon" onClick={toggleModal}>
                <img src={closeIcon} alt="close--icon" className="icon" />
              </a>
            </div>
          </div>
          <div className="popap__overlay" onClick={toggleModal}></div>
        </div>
      )}

      <Menu setPage={setPage} />
      <main className="appeals">
        <div className="wrapper">
          <div className="appeals__meta">
            <h2 className="text--2 appeals__title">Мои обращения</h2>
            <button
              className="main--text appeals__create"
              onClick={toggleModal}
            >
              Создать обращение
            </button>
          </div>
          <div className="appeals__list">
            {mockAppeals.map((appeal) => (
              <div className="appeal" key={appeal.id}>
                <div className="appeal__info">
                  <div className="info__block">
                    <div className="block__details">
                      <p className="text--main">Статус: {appeal.status}</p>
                      <p className="text--main">Категория: {appeal.category}</p>
                    </div>
                    <div className="appeal__actions">
                      <button className="button button--secondary">
                        Удалить обращение
                      </button>
                    </div>
                  </div>
                  <div className="info__block">
                    <p className="text--main">
                      Фамилия, Имя исполнителя: {appeal.lastName}{" "}
                      {appeal.firstName}
                    </p>
                    <p className="text--main">
                      Телефон исполнителя: {appeal.phone}
                    </p>
                  </div>
                  <div className="info__block">
                    <p className="text--main">
                      Комментарий исполнителя: <span>{appeal.comment}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer setPage={setPage} />
    </>
  );
};

export default AppealsUser;
