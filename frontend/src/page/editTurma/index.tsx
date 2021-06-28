import React, { useEffect, useState, FormEvent, useCallback } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
// import {Container, Content, Escola} from './styles';


import api from "../../service/api";
import Header from '../../Components/Header'
import Menu from '../../Components/Menu';
import { Content, Form } from "./styles";

interface Turmas{
  id: string;
  nome: string;
  
}
interface Professor{
  id: string;
  pessoa: {
    nome: string
  }
}

interface TurmaParams{
  idTurma: string;
}

const EditTurma: React.FC = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [turmas, setTurmas] = useState<Turmas[]>([])
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [newTeacher, setNewTeacher] = useState<string>('');
  const history = useHistory();

  const { params } = useRouteMatch<TurmaParams>();

  useEffect(() => {
    api.get(`/turma/escola/f8695fb3-0d7d-4d1f-8414-3992deb7b1ac`)
      .then(response => {
        setTurmas(response.data);
      });
  }, []);

  useEffect(() => {
    api.get(`/professor/escola/f8695fb3-0d7d-4d1f-8414-3992deb7b1ac`)
    .then(response => {
      setProfessores(response.data);
    });
  }, []);


  const toggleDrawer = () => {
      setIsOpen((prevState) => !prevState)
  }


  const handleSubmit = useCallback(async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    // await api.delete(`turma/professor/${params.idTurma}`);
    await api.put(`turma/professor/${params.idTurma}`,{id_professor: newTeacher});


    history.push('diretor/dashboard');
  },[history, params.idTurma, newTeacher])

  return(
    <>
    <Header toggleDrawer={toggleDrawer}/>
    <Menu  isOpen={isOpen} toggleDrawer={toggleDrawer} turmas={turmas}/>
    <Content>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="professor">Trocar professor da turma:</label>
        <div>
          <select name="professor" id="professor" value={newTeacher} onChange={e => setNewTeacher(e.target.value)} >
            <option value=''>Selecione</option>
            {professores.map(professor => (
              <option key={professor.id} value={professor.id}>{professor.pessoa.nome}</option>
            ))}
          </select>

          <button type="submit">Alterar Professor</button>
        </div>
      </Form>
    </Content>
    </>

  )
}

export default EditTurma;