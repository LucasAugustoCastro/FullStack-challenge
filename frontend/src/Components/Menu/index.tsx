import React, {MouseEventHandler} from 'react';

import {Drawer, Itens, ItensContent} from './styles';
import { Link } from "react-router-dom";

interface Turma{
  id: string;
  nome: string;
  
}
 
interface Teste{
  toggleDrawer: MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
  turmas: Turma[];
}

const Menu: React.FC<Teste> = ({isOpen, turmas, toggleDrawer}) => { 
  return (
    <Drawer open={isOpen} onClick={toggleDrawer}>
        <Itens>
          {turmas.map(turma => (
            <ItensContent key={turma.id}><Link to={`/diretor/turma/${turma.id}`}>{turma.nome}</Link></ItensContent>

          ))}
          
        </Itens>
      </Drawer>

  );  
};

export default Menu;