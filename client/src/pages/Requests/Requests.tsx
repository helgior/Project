import React from 'react';
import { IBasePage } from '../PageManager';
import Menu from '../../components/Menu/Menu';

import './Requests.scss';

const Requests: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    return (<div className='Requests'>
        <header>
        <h1>Заявки</h1>
        <nav>
          <ul>
          <Menu setPage={setPage} />
          </ul>
        </nav>
      </header>
      
        
    </div>)
}

export default Requests;