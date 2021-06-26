import { Router } from 'express';
import { getRepository } from 'typeorm';
import Turma from '../models/Turma';
import CreateClassService from '../services/CreateClassService';
import CreateStudentClassService from '../services/CreateStudentClassService';

const turmaRouter = Router();

turmaRouter.get('/', async (request, response)=>{

  const turmaRepository = getRepository(Turma);
  const turmas = await turmaRepository.find()


  return response.status(200).json(turmas);
});

turmaRouter.get('/:id', async (request, response)=>{
  const { id } = request.params

  const turmaRepository = getRepository(Turma);
  const turma = await turmaRepository.findOne(id)
  delete turma?.professor.pessoa.password;
  delete turma?.escola.diretor.pessoa.password;


  return response.status(200).json(turma);
});


turmaRouter.post('/', async (request, response) =>{
  try{
    const {id_professor, id_escola, nome, hora_inicio, hora_fim} = request.body;

    const createClass = new CreateClassService();

    const turma = await createClass.execute({
      id_professor,
      id_escola,
      nome,
      hora_inicio,
      hora_fim,
    });

    response.json(turma)
  }catch (err) {
    return response.status(400).json({ error: err.message });
  }


});
turmaRouter.post('/aluno', async (request, response) => {
  try{
    const {id_aluno, id_turma} = request.body;

    const createClassStudent = new CreateStudentClassService();

    const classStudent = await createClassStudent.execute({id_aluno, id_turma});

    return response.status(200).json(classStudent);
  } catch(err){
    return response.status(400).json({erro: err.message});
  }
})

export default turmaRouter;