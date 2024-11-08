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
        <Button text='Авторизация' onClick={() => setPage(PAGES.LOGIN)} />
        <Button text='Сообщество' onClick={() => setPage(PAGES.COMMUNITY)} />
        <Button text='Помощь' onClick={() => setPage(PAGES.HELP)} />
        <Button text='Новости' onClick={() => setPage(PAGES.NEWS)} />
        <Button text='Счетчики' onClick={() => setPage(PAGES.METERS)} />
        <Button text='Заявки' onClick={() => setPage(PAGES.REQUESTS)} />
        <Button text='Проблемы' onClick={() => setPage(PAGES.ISSUES)} />
        <Button text='Оплата' onClick={() => setPage(PAGES.PAYMENT)} />
        <Button text='Услуги' onClick={() => setPage(PAGES.SERVICES)} />
        
    </div>)
}

export default Menu;