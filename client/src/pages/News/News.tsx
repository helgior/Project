import React from 'react';
import { IBasePage } from '../PageManager';
import Menu from '../../components/Menu/Menu';

import './News.scss';

const News: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    return (<div className='News'>
        <header>
        <h1>Новости</h1>
        <nav>
          <ul>
          <Menu setPage={setPage} />
          </ul>
        </nav>
      </header>
      
        
    </div>)
}

export default News;