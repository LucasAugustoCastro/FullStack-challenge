import React, { useEffect } from "react";
import {Container, Header, HeaderContent, Itens, ItensContent, Drawer, Content, TurmaContent, Professor, Aluno, TurmaHead} from './styles';

import { FiPower, FiMenu, FiChevronLeft } from 'react-icons/fi';
import 'react-modern-drawer/dist/index.css'

import logoImg from '../../assets/logo.png';
import { Link, useRouteMatch } from "react-router-dom";
import api from "../../service/api";

interface ITurma{
  id: string;
  nome: string;
  professor:{
    id: string;
    pessoa: {
      id: string;
      nome: string;
      email: string;
    };
  };
  
}

interface Turmas {
  id: string;
  nome: string;
}
interface Alunos{
  aluno: {
    id: string;
    nome_responsavel: string;
    telefone_responsavel: string;
    pessoa: {
      nome: string;
      email: string;
    }
  }
}
interface TurmaParams{
  idEscola: string;
}

const Turma: React.FC = () => {  
  const [isOpen, setIsOpen] = React.useState(false)
  const [turmas, setTurmas] = React.useState<Turmas[]>([])
  const [turma, setTurma] = React.useState<ITurma|null>(null);
  const [alunos, setAlunos] = React.useState<Alunos[]>([]);



  const toggleDrawer = () => {
      setIsOpen((prevState) => !prevState)
  }

  const { params } = useRouteMatch<TurmaParams>();

  useEffect(() => {
    api.get(`/turma/escola/fc1e5a2c-2c92-4a4a-b22b-fe3f1eebea32`)
      .then(response => {
        setTurmas(response.data);
      });
  }, []);

  useEffect(() => {
    api.get(`/turma/${params.idEscola}`)
      .then(response=> {
        setTurma(response.data);
      })
  }, [params.idEscola]);

  useEffect(() => {
      api.get(`/aluno/${params.idEscola}`)
      .then(response => {
        setAlunos(response.data);
      });
  }, [params.idEscola])


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
          {turmas.map(turmas => (
            <ItensContent key={turmas.id}><Link to={`${turmas.id}`}>{turmas.nome}</Link></ItensContent>

          ))}
          
        </Itens>
      </Drawer>
      <Content>

      <TurmaContent>
        <TurmaHead>
          <div>
            <Link to={`/diretor/turma/editar`}>Editar</Link>
          </div>
          <div>
            <Link to={`/diretor/dashboard`}><FiChevronLeft size={16}/> Voltar</Link>

          </div>
        </TurmaHead>
        <Professor>
          <h1>Professor: {turma?.professor.pessoa.nome}</h1>
          <b>Email de contato: {turma?.professor.pessoa.email}</b>
        </Professor>
        {alunos.map(aluno => (
          <Aluno key={aluno.aluno.id}>
            <h1>Aluno: {aluno.aluno.pessoa.nome}</h1>
            <b>Responsavel: {aluno.aluno.nome_responsavel}</b>
            <p>Telefone: { aluno.aluno.telefone_responsavel}</p>
          </Aluno>

        ))}
        
      </TurmaContent>
      </Content>
    </Container>
  )
}

export default Turma;