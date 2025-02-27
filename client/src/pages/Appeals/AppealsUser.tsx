import React, { useContext, useState } from "react";
import { StoreContext, ServerContext } from "../../App";
import { IBasePage } from "../PageManager";
import Menu from "../../components/Menu/Menu";
import Footer from "../../components/Footer/Footer";
import "./Appeals.scss";
import closeIcon from "../../assets/img/close-icon.svg";

const AppealsUser: React.FC<IBasePage> = (props: IBasePage) => {
  const { setPage } = props;
  const store = useContext(StoreContext);
  const server = useContext(ServerContext);
  const user = store.getUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [comment, setComment] = useState("");

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

  const createAppeal = async () => {
    if (!selectedCategory || !comment) {
      alert("Пожалуйста, выберите категорию и добавьте комментарий.");
      return;
    }

    const response = await server.createAppeal(user.id, selectedCategory, comment);
    if (response) {
      alert("Обращение успешно создано.");
      setIsModalOpen(false);
    } else {
      alert("Ошибка при создании обращения.");
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
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button className="formPopap__button" onClick={createAppeal}>
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
              {/* Здесь будет отображаться список обращений пользователя */}
            </div>
          </div>
        </main>
        <Footer setPage={setPage} />
      </>
    );
};

export default AppealsUser;