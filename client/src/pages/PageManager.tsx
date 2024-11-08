import React, { useState } from 'react';

import Preloader from './Preloader/Preloader';
import Main from './Main/Main';
import Login from './Login/Login';
import Chat from './Chat/Chat';
import GamePage from './Game/Game';
import NotFound from './NotFound/NotFound';
import Community from './Community/Community';
import Help from './Help/Help';
import Issues from './Issues/Issues';
import Meters from './Meters/Meters';
import News from './News/News';
import Payment from './Payment/Payment';
import Requests from './Requests/Requests';
import Services from './Services/Services';



export enum PAGES {
    PRELOADER,
    MAIN,
    LOGIN,
    CHAT,
    GAME,
    NOT_FOUND,
    COMMUNITY,
    HELP,
    ISSUES,
    METERS,
    NEWS,
    PAYMENT,
    REQUESTS,
    SERVICES
}

export interface IBasePage {
    setPage: (name: PAGES) => void
}

const PageManager: React.FC = () => {
    const [page, setPage] = useState<PAGES>(PAGES.PRELOADER);

    return (
        <ul>
            {page === PAGES.PRELOADER && <Preloader setPage={setPage} />}
            {page === PAGES.MAIN && <Main setPage={setPage} />}
            {page === PAGES.LOGIN && <Login setPage={setPage} />}
            {page === PAGES.CHAT && <Chat setPage={setPage} />}
            {page === PAGES.GAME && <GamePage setPage={setPage} />}
            {page === PAGES.NOT_FOUND && <NotFound setPage={setPage} />}
            {page === PAGES.COMMUNITY && <Community setPage={setPage} />}
            {page === PAGES.HELP && <Help setPage={setPage} />}
            {page === PAGES.ISSUES && <Issues setPage={setPage} />}
            {page === PAGES.METERS && <Meters setPage={setPage} />}
            {page === PAGES.NEWS && <News setPage={setPage} />}
            {page === PAGES.PAYMENT && <Payment setPage={setPage} />}
            {page === PAGES.REQUESTS && <Requests setPage={setPage} />}
            {page === PAGES.SERVICES && <Services setPage={setPage} />}
            
        </ul>
    );
}

export default PageManager;