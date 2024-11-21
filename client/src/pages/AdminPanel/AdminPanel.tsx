import React, { useState, useContext } from 'react';
import { StoreContext } from '../../App';
import Button from '../../components/Button/Button';
import { IBasePage, PAGES } from '../../pages/PageManager';

const AdminPanel: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const store = useContext(StoreContext);
    const user = store.getUser();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('user');

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
                </select>
                <Button text="Добавить пользователя" onClick={addUser} />
            </div>
            <Button text="Назад" onClick={() => setPage(PAGES.MAIN)} />
        </div>
    );
};

export default AdminPanel;
