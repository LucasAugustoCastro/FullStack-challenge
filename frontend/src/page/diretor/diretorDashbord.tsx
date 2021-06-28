import React, { useEffect } from "react";
import {Container, Content, Escola} from './styles';


import api from "../../service/api";
import Header from '../../Components/Header'
import Menu from '../../Components/Menu';

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
      .get(`/turma/escola/f8695fb3-0d7d-4d1f-8414-3992deb7b1ac`, {
        
      })
      .then(response => {
        setTurma(response.data);
      });
  }, []);

  return (
    <Container>
      <Header toggleDrawer={toggleDrawer}/>

      <Menu toggleDrawer={toggleDrawer} turmas={turmas} isOpen={isOpen} />

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