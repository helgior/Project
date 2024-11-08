import React from 'react';
import { IBasePage } from '../PageManager';
import Menu from '../../components/Menu/Menu';

import './Payment.scss';

const Payment: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    return (<div className='Payment'>
        <header>
        <h1>Оплата</h1>
        <nav>
          <ul>
          <Menu setPage={setPage} />
          </ul>
        </nav>
      </header>
      
        
    </div>)
}

export default Payment;