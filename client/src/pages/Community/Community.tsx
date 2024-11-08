import React from 'react';
import { IBasePage } from '../PageManager';
import Menu from '../../components/Menu/Menu';

import './Community.scss';

const Community: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    return (<div className='Community'>
        <header>
        <h1>Сообщество</h1>
      
         
          <Menu setPage={setPage} />
        
      </header>
      
        
    </div>)
}

export default Community;