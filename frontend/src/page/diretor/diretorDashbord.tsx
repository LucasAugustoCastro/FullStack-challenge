import React, { useEffect } from "react";
import {Container, Header, HeaderContent, Itens, ItensContent, Drawer, Content, Escola} from './styles';

import { FiPower, FiMenu } from 'react-icons/fi';
import 'react-modern-drawer/dist/index.css'

import logoImg from '../../assets/logo.png';
import { Link } from "react-router-dom";
import api from "../../service/api";

interface Turmas{
  id: string;
  nome: string;
  
}

const DiretorDashboard: React.FC = () => {  
  const [isOpen, setIsOpen] = React.useState(false)
  const [turmas, setTurma] = React.useState<Turmas[]>([])
  const toggleDrawer = () => {
      setIsOpen((prevState) => !prevState)
  }

  useEffect(() => {
    api
      .get(`/turma/escola/fc1e5a2c-2c92-4a4a-b22b-fe3f1eebea32`, {
        
      })
      .then(response => {
        setTurma(response.data);
      });
  }, []);

  return (
    <Container>
      <Header>
          <HeaderContent>
            <button onClick={toggleDrawer}><FiMenu /></button>
            <div>
              <img src={logoImg} alt="" />
              <h1>Nome Escola</h1>
            </div>
            <button><FiPower/></button>
          </HeaderContent>
      </Header>

      <Drawer open={isOpen} onClick={toggleDrawer}>
        <Itens>
          {turmas.map(turma => (
            <ItensContent key={turma.id}><Link to={`turma/${turma.id}`}>{turma.nome}</Link></ItensContent>

          ))}
          
        </Itens>
      </Drawer>
      <Content>

      <Escola>
        <h1>Escola</h1>
        <p>Informaçoes da escola</p>
      </Escola>
      </Content>
    </Container>
  )
}

export default DiretorDashboard;