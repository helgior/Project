import React, { useContext, useEffect } from 'react';
import CONFIG from '../../config';
import { ServerContext } from '../../App';
import { useBannerContext } from '../../components/BannerContext/BannerContext';
import { IBasePage } from '../PageManager';
import Menu from '../../components/Menu/Menu';
import Button from '../../components/Button/Button';

import './Main.scss';

const { STATIC } = CONFIG;

const Main: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const server = useContext(ServerContext);
    const { banners, setBanners } = useBannerContext();

    useEffect(() => {
        (async () => {
            if (!banners) {
                const bannersRes = await server.getBanners();
                setBanners(bannersRes);
            }
        })();
    }, [banners, server, setBanners]);

    const hideBanner = async (id: number, hidden: boolean) => {
        const response = await server.updateBanner(id, hidden);
        if (response) {
            const bannersRes = await server.getBanners();
            setBanners(bannersRes);
        } else {
            alert('Ошибка при скрытии баннера');
        }
    };

    return (
        <div className='main'>
            <h1>Главная</h1>
            <Menu setPage={setPage} />
            {banners && banners.filter(banner => !banner.hidden).map((banner) => (
                <div key={banner.id}>
                    <p>{banner.title}</p>
                    <span>{banner.text}</span>
                    <img alt='' src={`${STATIC}${banner.image}`} width='500px' />
                    <Button text="Скрыть" onClick={() => hideBanner(banner.id, true)} />
                </div>
            ))}
        </div>
    );
};

export default Main;
