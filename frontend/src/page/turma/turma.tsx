import React, { useEffect } from "react";
import {Container, Content, TurmaContent, Professor, Aluno, TurmaHead} from './styles';

import { FiChevronLeft } from 'react-icons/fi';
import { Link, useRouteMatch } from "react-router-dom";

import api from "../../service/api";
import Header from '../../Components/Header';
import Menu from '../../Components/Menu';


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
  idTurma: string;
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
    api.get(`/turma/escola/f8695fb3-0d7d-4d1f-8414-3992deb7b1ac`)
      .then(response => {
        setTurmas(response.data);
      });
  }, []);

  useEffect(() => {
    api.get(`/turma/${params.idTurma}`)
      .then(response=> {
        setTurma(response.data);
      })
  }, [params.idTurma]);

  useEffect(() => {
      api.get(`/aluno/${params.idTurma}`)
      .then(response => {
        setAlunos(response.data);
      });
  }, [params.idTurma])


  return (
    <Container>
      <Header toggleDrawer={toggleDrawer}/>

      <Menu toggleDrawer={toggleDrawer} turmas={turmas} isOpen={isOpen} />
      <Content>

      <TurmaContent>
        <TurmaHead>
          <div>
            <Link to={`/diretor/turma/editar/${params.idTurma}`}>Editar</Link>
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