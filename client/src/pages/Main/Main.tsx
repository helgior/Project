import React from 'react';
import { IBasePage } from '../PageManager';
import Menu from '../../components/Menu/Menu';

import './Main.scss';

const Main: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    return (<div className='main'>
        <header>
        <h1>Главная</h1>
        <Menu setPage={setPage} />
      </header>
      
        
    </div>)
}

export default Main;

/*
import React from 'react';
import './Main.scss';


const Index: React.FC = () => {
  return (
    <div>
      <header>
        <h1>ЖКХ онлайн</h1>
        <nav>
          <ul>
            <li><a href="index.tsx">Главная</a></li>
            <li><a href="services.tsx">Услуги</a></li>
            <li><a href="payment.tsx">Оплата</a></li>
            <li><a href="meters.tsx">Счетчики</a></li>
            <li><a href="requests.tsx">Заявки</a></li>
            <li><a href="issues.tsx">Проблемы</a></li>
            <li><a href="community.tsx">Сообщество</a></li>
            <li><a href="news.tsx">Новости</a></li>
            <li><a href="help.tsx">Помощь</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <h2>Добро пожаловать в ЖКХ онлайн</h2>
          <p>Здесь вы найдете всю информацию о ЖКХ услугах и поддержке.</p>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 ЖКХ онлайн. Все права защищены.</p>
      </footer>
    </div>

const { setPage } = props;
const server = useContext(ServerContext);
const [banners, setBanners] = useState<TBanner[] | null>(null);

useEffect(() => {
    (async () => {
        if (!banners) {
            const bannersRes = await server.getBanners();
            setBanners(bannersRes);
        }
    })();
});

return (<div className='main'>
    <h1>Главная</h1>
    <Menu setPage={setPage} />
    {banners && banners.map((banner, index) => (
        <div key={index}>
            <p>{banner.title}</p>
            <span>{banner.text}</span>
        </div>
    ))}
</div>)
  );
};

export default Index;

*/
