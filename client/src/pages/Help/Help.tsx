import React, { useContext, useEffect, useState, useMemo, useRef } from 'react';
import { IBasePage, PAGES } from '../PageManager';
import Menu from '../../components/Menu/Menu';

import './Help.scss';

const Help: React.FC<IBasePage> = (props: IBasePage) => {
    
    
        const { setPage } = props;
        return (<div className='help'>
          <header>
            <h1>Помощь</h1>

            <Menu setPage={setPage} />
            </header>
        </div>)
    }

   

export default Help;