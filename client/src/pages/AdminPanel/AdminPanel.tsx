import React, { useState, useContext, useEffect } from 'react';
import { StoreContext, ServerContext } from '../../App';
import { useBannerContext } from '../../components/BannerContext/BannerContext';
import Button from '../../components/Button/Button';
import { IBasePage, PAGES } from '../../pages/PageManager';
import { TBanner } from '../../services/server/types';

const AdminPanel: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const store = useContext(StoreContext);
    const server = useContext(ServerContext);
    const { banners, setBanners } = useBannerContext();
    const user = store.getUser();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('user');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');
    const [newsTitle, setNewsTitle] = useState('');
    const [newsText, setNewsText] = useState('');
    const [newsImage, setNewsImage] = useState('');

    useEffect(() => {
        (async () => {
            if (!banners) {
                const bannersRes = await server.getBanners();
                setBanners(bannersRes);
            }
        })();
    }, [banners, server, setBanners]);

    const addUser = async () => {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password, name, role }),
        });
        const result = await response.json();
        if (result.error) {
            alert('Ошибка при добавлении пользователя: ' + result.error);
        } else {
            alert('Пользователь успешно добавлен');
        }
    };

    const addBanner = async () => {
        const response = await server.addBanner(title, text, image, url);
        if (response) {
            const bannersRes = await server.getBanners();
            setBanners(bannersRes);
            alert('Баннер успешно добавлен');
        } else {
            alert('Ошибка при добавлении баннера');
        }
    };

    const deleteBanner = async (id: number) => {
        const response = await server.deleteBanner(id);
        if (response) {
            const bannersRes = await server.getBanners();
            setBanners(bannersRes);
            alert('Баннер успешно удален');
        } else {
            alert('Ошибка при удалении баннера');
        }
    };

    const hideBanner = async (id: number, hidden: boolean) => {
        const response = await server.updateBanner(id, hidden);
        if (response) {
            const bannersRes = await server.getBanners();
            setBanners(bannersRes);
            alert('Баннер успешно скрыт');
        } else {
            alert('Ошибка при скрытии баннера');
        }
    };

    const setBannerOrder = async (id: number, priority: number) => {
        const response = await server.setBannerOrder(id, priority);
        if (response) {
            const bannersRes = await server.getBanners();
            setBanners(bannersRes);
            alert('Приоритет баннера успешно изменен');
        } else {
            alert('Ошибка при изменении приоритета баннера');
        }
    };

    const addNews = async () => {
        const response = await server.addNews(newsTitle, newsText, newsImage);
        if (response) {
            alert('Новость успешно добавлена');
        } else {
            alert('Ошибка при добавлении новости');
        }
    };

    if (user && user.role !== 'admin') {
        return <div>Доступ запрещен</div>;
    }

    return (
        <div className='admin-panel'>
            <h1>Админ панель</h1>
            <div>
                <input type="text" placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} />
                <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="text" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">Пользователь</option>
                    <option value="admin">Администратор</option>
                    <option value="executor">Исполнитель</option>
                </select>
                <Button text="Добавить пользователя" onClick={addUser} />
            </div>
            <div>
                <input type="text" placeholder="Заголовок баннера" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Текст баннера" value={text} onChange={(e) => setText(e.target.value)} />
                <input type="text" placeholder="Изображение баннера" value={image} onChange={(e) => setImage(e.target.value)} />
                <input type="text" placeholder="URL баннера" value={url} onChange={(e) => setUrl(e.target.value)} />
                <Button text="Добавить баннер" onClick={addBanner} />
            </div>
            <div>
                <h2>Список баннеров</h2>
                {banners && banners.map((banner: TBanner) => (
                    <div key={banner.id}>
                        <p>{banner.title}</p>
                        <Button text="Удалить" onClick={() => deleteBanner(banner.id)} />
                        <Button text={banner.hidden ? "Показать" : "Скрыть"} onClick={() => hideBanner(banner.id, !banner.hidden)} />
                        <input
                            type="number"
                            placeholder="Приоритет"
                            value={banner.priority}
                            onChange={(e) => setBannerOrder(banner.id, parseInt(e.target.value))}
                        />
                    </div>
                ))}
            </div>
            <div>
                <input type="text" placeholder="Заголовок новости" value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} />
                <input type="text" placeholder="Текст новости" value={newsText} onChange={(e) => setNewsText(e.target.value)} />
                <input type="text" placeholder="Изображение новости" value={newsImage} onChange={(e) => setNewsImage(e.target.value)} />
                <Button text="Добавить новость" onClick={addNews} />
            </div>
            <Button text="Назад" onClick={() => setPage(PAGES.MAIN)} />
        </div>
    );
};

export default AdminPanel;
