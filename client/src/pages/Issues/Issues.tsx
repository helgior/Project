import React from 'react';
import { IBasePage } from '../PageManager';
import Menu from '../../components/Menu/Menu';

import './Issues.scss';

const Issues: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    return (<div className='Issues'>
        <header>
        <h1>ЖКХ онлайн</h1>
        <nav>
          <ul>
          <Menu setPage={setPage} />
          </ul>
        </nav>
      </header>
      
        
    </div>)
}

export default Issues;