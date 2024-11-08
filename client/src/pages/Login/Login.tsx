import React from 'react';
import { IBasePage } from '../PageManager';
import Menu from '../../components/Menu/Menu';

import './Login.scss';

const Login: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    return (<div className='Login'>
        <header>
        <h1>Авторизация</h1>
          <Menu setPage={setPage} />      
      </header>
      
        
    </div>)
}

export default Login;