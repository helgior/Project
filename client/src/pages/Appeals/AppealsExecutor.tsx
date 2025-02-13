import React, { useState, useEffect, useContext } from "react";
import { StoreContext, ServerContext } from "../../App";
import { IBasePage } from "../PageManager";
import Menu from "../../components/Menu/Menu";
import Footer from "../../components/Footer/Footer";
import "./Appeals.scss";
import { TAppeal } from "../../services/server/types";

const AppealsExecutor: React.FC<IBasePage> = (props: IBasePage) => {
  const { setPage } = props;
  const store = useContext(StoreContext);
  const server = useContext(ServerContext);
  const user = store.getUser();

  const [appeals, setAppeals] = useState<TAppeal[]>([]);
  const [error, setError] = useState("");

  const validStatuses = ["В ожидании", "В работе", "Завершено", "Отменен"];

  useEffect(() => {
    (async () => {
      try {
        const appealsRes = await server.getAppeals();
        if (appealsRes) {
          const formattedAppeals = appealsRes.map((appeal) => ({
            ...appeal,
            status: appeal.status as
              | "В ожидании"
              | "В работе"
              | "Завершено"
              | "Отменен",
          }));

          setAppeals(formattedAppeals);
        } else {
          setError("Нет доступных обращений.");
        }
      } catch (err) {
        setError("Ошибка при загрузке обращений.");
      }
    })();
  }, [server]);

  const handleTakeInWork = async (id: number) => {
    try {
      const response = await server.updateAppealStatus(id, "В работе");
      if (response) {
        const updatedAppeals = appeals.map((appeal) =>
          appeal.id === id ? { ...appeal, status: validStatuses.includes(appeal.status) ? appeal.status : "В работе" } : appeal
        );
        setAppeals(updatedAppeals);
      }
    } catch (err) {
      alert("Ошибка при взятии обращения в работу.");
    }
  };

  const handleCancel = async (id: number) => {
    try {
      const response = await server.updateAppealStatus(id, "Отменен");
      if (response) {
        const updatedAppeals = appeals.map((appeal) =>
          appeal.id === id ? { ...appeal, status: validStatuses.includes(appeal.status) ? appeal.status : "Отменен" } : appeal
        );
        setAppeals(updatedAppeals);
      }
    } catch (err) {
      alert("Ошибка при отмене обращения.");
    }
  };

  const handleComplete = async (id: number) => {
    try {
      const response = await server.updateAppealStatus(id, "Завершено");
      if (response) {
        const updatedAppeals = appeals.map((appeal) =>
          appeal.id === id ? { ...appeal, status: validStatuses.includes(appeal.status) ? appeal.status : "Завершено" } : appeal
        );
        setAppeals(updatedAppeals);
      }
    } catch (err) {
      alert("Ошибка при завершении обращения.");
    }
  };

  if (user && user.role !== "executor") {
    return <div>Доступ запрещен</div>;
  }

  return (
    <>
      <Menu setPage={setPage} />
      <main className="appeals">
        <div className="wrapper">
          <h2 className="text--2 appealstitle">Обращения</h2>
          <div className="appealslist">
            {appeals.map((appeal) => (
              <div className="appeal" key={appeal.id}>
                <div className="appealinfo">
                  <div className="infoblock">
                    <div className="blockdetails">
                      <p className="text--main">Статус: {appeal.status}</p>
                      <p className="text--main">Категория: {appeal.category}</p>
                    </div>
                    <div className="appealactions">
                      {appeal.status === "В ожидании" && (
                        <button onClick={() => handleTakeInWork(appeal.id)}>
                          Взять в работу
                        </button>
                      )}
                      {appeal.status === "В работе" && (
                        <button onClick={() => handleComplete(appeal.id)}>
                          Завершить
                        </button>
                      )}
                      {appeal.status !== "Отменен" && (
                        <button onClick={() => handleCancel(appeal.id)}>
                          Отменить
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="infoblock">
                    <p className="text--main">
                      Фамилия, Имя: {appeal.user.surname} {appeal.user.name}
                    </p>
                    <p className="text--main">Телефон: {appeal.user.login}</p>
                  </div>
                  <div className="infoblock">
                    <p className="text--main">
                      Комментарий пользователя: <span>{appeal.comment}</span>
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

export default AppealsExecutor;
