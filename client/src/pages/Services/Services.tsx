import React from 'react';
import { IBasePage } from '../PageManager';
import Menu from '../../components/Menu/Menu';

import './Services.scss';

const Services: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    return (<div className='Services'>
        <header>
        <h1>Услуги</h1>
        <nav>
          <ul>
          <Menu setPage={setPage} />
          </ul>
        </nav>
      </header>
      
        
    </div>)
}

export default Services;