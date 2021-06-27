import { Router } from 'express';

import CreateAlunoService from '../services/CreateStudentService';
import GetAllStudentsInClassService from '../services/GetAllStudentsInClassService';
import LoginAlunoService from '../services/LoginAlunoService';

const alunoRouter = Router();

alunoRouter.get('/:idTurma', async (request, response) => {
  try{
    const {idTurma} = request.params;
    const allStudentsInClass = new GetAllStudentsInClassService();
    const students = await allStudentsInClass.execute({id_turma: idTurma});

    return response.status(200).json(students);
  }catch(err){
    return response.status(400).json({error : err.message})
  }
})

alunoRouter.post('/', async (request, response) =>{
  try{
    const {nome, cpf, telefone, email, password, nomeResponsavel, telefoneResponsavel} = request.body;
    
    const createAluno = new CreateAlunoService();

    const aluno = await createAluno.execute({
      nome, 
      cpf, 
      telefone, 
      email, 
      password,
      nome_responsavel: nomeResponsavel,
      telefone_responsavel: telefoneResponsavel,
    });

    response.json(aluno)
  }catch (err) {
    return response.status(400).json({ error: err.message });
  }


});

alunoRouter.post('/login', async (request, response) => {
  try{
    const {email, password} = request.body;

    const alunoLogin = new LoginAlunoService()

    const {aluno, token} = await alunoLogin.execute({email, password});

    return response.status(200).json({aluno, token});

  }catch (err){
    return response.status(400).json({error: err.message });
  }
})

export default alunoRouter;