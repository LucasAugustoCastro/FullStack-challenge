import React, {MouseEventHandler} from 'react';

import {HeaderContainer, HeaderContent} from './styles';
import { FiPower, FiMenu } from 'react-icons/fi';

import logoImg from '../../assets/logo.png';

interface Teste{
  toggleDrawer: MouseEventHandler<HTMLButtonElement>;
}

const Header: React.FC<Teste> = ({toggleDrawer}) => { 
  return (
    <HeaderContainer>
        <HeaderContent>
          <button onClick={toggleDrawer}><FiMenu /></button>
          <div>
            <img src={logoImg} alt="" />
            <h1>Nome Escola</h1>
          </div>
          <button><FiPower/></button>
        </HeaderContent>
    </HeaderContainer>

  );  
};

export default Header;