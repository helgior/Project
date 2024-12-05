import React, { useState, useContext } from 'react';
import { StoreContext, ServerContext } from '../../App';
import { useBannerContext } from '../../components/BannerContext/BannerContext';
import Button from '../../components/Button/Button';
import { IBasePage, PAGES } from '../../pages/PageManager';

const AdminPanel: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const store = useContext(StoreContext);
    const server = useContext(ServerContext);
    const { setBanners } = useBannerContext();
    const user = store.getUser();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('user');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');

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
            <Button text="Назад" onClick={() => setPage(PAGES.MAIN)} />
        </div>
    );
};

export default AdminPanel;
