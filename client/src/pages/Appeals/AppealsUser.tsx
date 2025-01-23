import React, { useContext, useState, useEffect } from "react";
import { StoreContext, ServerContext } from "../../App";
import { IBasePage } from "../PageManager";
import Menu from "../../components/Menu/Menu";
import Footer from "../../components/Footer/Footer";
import { TAppeal } from "../../services/server/types";

import "./Appeals.scss";
import closeIcon from "../../assets/img/close-icon.svg";

const AppealsUser: React.FC<IBasePage> = (props: IBasePage) => {
  const { setPage } = props;
  const store = useContext(StoreContext);
  const server = useContext(ServerContext);
  const user = store.getUser();

  const [appeals, setAppeals] = useState<TAppeal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const categories = ["Сантехника", "Электрика", "Функциональность веб-сайта"];

  useEffect(() => {
    fetchAppeals();
  }, []);

  const fetchAppeals = async () => {
    if (!user) return;
  
    const fetchedAppeals = await server.getAppeals();
  
    if (fetchedAppeals) {
      fetchedAppeals.forEach((appeal) => {
        console.log('Appeal User ID:', appeal.user.id);
      });
      console.log('Current User ID:', user.id);
  
      setAppeals(fetchedAppeals.filter(appeal => appeal.user.id === user.id));
    }
  };
  

  if (!user || user.role !== "user") {
    return <div>Доступ запрещен</div>;
  }

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
    if (!isModalOpen) {
      setSelectedCategory(null);
      setComment("");
    }
  };

  const toggleSelector = () => setIsSelectorOpen(prev => !prev);

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setIsSelectorOpen(false);
  };

  const handleSubmit = async () => {
    if (!selectedCategory || !user) return;
    
    const success = await server.addAppeal(
      user.id,
      selectedCategory as "Сантехника" | "Электрика" | "Функциональность веб-сайта",
      comment
    );

    if (success) {
      await fetchAppeals();
      toggleModal();
    }
  };

  const handleDelete = async (appealId: number) => {
    if (window.confirm("Вы уверены, что хотите удалить это обращение?")) {
      const success = await server.deleteAppeal(appealId);
      if (success) {
        await fetchAppeals();
      }
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
              <button 
                className="formPopap__button"
                onClick={handleSubmit}
                disabled={!selectedCategory}
              >
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
            {appeals.map((appeal) => (
              <div className="appeal" key={appeal.id}>
                <div className="appeal__info">
                  <div className="info__block">
                    <div className="block__details">
                      <p className="text--main">Статус: {appeal.status}</p>
                      <p className="text--main">Категория: {appeal.category}</p>
                    </div>
                    <div className="appeal__actions">
                      <button 
                        className="button button--secondary"
                        onClick={() => handleDelete(appeal.id)}
                      >
                        Удалить обращение
                      </button>
                    </div>
                  </div>
                  {appeal.executorId && (
                    <div className="info__block">
                      <p className="text--main">
                        Исполнитель: {appeal.user.surname} {appeal.user.name}
                      </p>
                    </div>
                  )}
                  {appeal.comment && (
                    <div className="info__block">
                      <p className="text--main">
                        Комментарий: <span>{appeal.comment}</span>
                      </p>
                    </div>
                  )}
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