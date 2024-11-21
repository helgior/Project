import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../App';
import { TBanner, TMessages } from '../../services/server/types';
import Button from '../Button/Button';
import { IBasePage, PAGES } from '../../pages/PageManager';

const Menu: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const store = useContext(StoreContext);
    const user = store.getUser();

    return (<div className='menu'>
        {user && <div>{`Привет! ${user.name}`}</div>}
        <Button text='Главная' onClick={() => setPage(PAGES.MAIN)} />
        <Button text='Новости' onClick={() => setPage(PAGES.GAME)} />
        <Button text='Обращения' onClick={() => setPage(PAGES.CHAT)} />
        <Button text='Авторизация' onClick={() => setPage(PAGES.LOGIN)} />
    </div>)
}

export default Menu;