import React from 'react';
import { IBasePage } from '../PageManager';
import Menu from '../../components/Menu/Menu';

import './Meters.scss';

const Meters: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    return (<div className='Meters'>
        <header>
        <h1>Счетчики</h1>
        <nav>
          <ul>
          <Menu setPage={setPage} />
          </ul>
        </nav>
      </header>
      
        
    </div>)
}

export default Meters;