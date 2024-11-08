import React, { useContext, useEffect, useState, useMemo, useRef } from 'react';
import { IBasePage, PAGES } from '../PageManager';
import Menu from '../../components/Menu/Menu';

import './Chat.scss';

const Chat: React.FC<IBasePage> = (props: IBasePage) => {
    
    
        const { setPage } = props;
        return (<div className='chat'>
            <h1>Чат</h1>
            <h1>Что-то пошло не так =(</h1>
            <Menu setPage={setPage} />
          
        </div>)
    }

   

export default Chat;