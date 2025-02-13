import React from 'react';
import Store from './services/store/Store';
import Server from './services/server/Server';
import Popup from './components/Popup/Popup';
import PageManager from './pages/PageManager';
import { BannerProvider } from './components/BannerContext/BannerContext';

import './App.scss';

export const StoreContext = React.createContext<Store>(null!);
export const ServerContext = React.createContext<Server>(null!);

const App: React.FC = () => {
    const store = new Store();
    const server = new Server(store);

    return (
        <StoreContext.Provider value={store}>
            <ServerContext.Provider value={server}>
                <BannerProvider> {/* Оборачиваем приложение новым провайдером контекста */}
                    <div className='app'>
                        <Popup />
                        <PageManager />
                    </div>
                </BannerProvider>
            </ServerContext.Provider>
        </StoreContext.Provider>
    );
}

export default App;
