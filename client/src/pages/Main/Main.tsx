import React, { useContext, useEffect, useState } from 'react';
import CONFIG from '../../config';
import { ServerContext } from '../../App';
import { TBanner } from '../../services/server/types';
import { IBasePage } from '../PageManager';
import Menu from '../../components/Menu/Menu';

import './Main.scss';

const { STATIC } = CONFIG;

const Main: React.FC<IBasePage> = (props: IBasePage) => {
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
                <img alt='' src={`${STATIC}${banner.image}`} width='500px' />
            </div>
        ))}
    </div>)
}

export default Main;