import {  response, Router } from 'express';
import { getRepository, getTreeRepository, RepositoryNotFoundError, RepositoryNotTreeError } from 'typeorm';
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

turmaRouter.get('/escola/:idEscola', async (request, response) => {
  const {idEscola} = request.params;
  const turmaRepository = getRepository(Turma);
  const turmas = await turmaRepository.find({where: {id_escola: idEscola}})

  return response.status(200).json(turmas);
})


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
    return response.status(400).json({error: err.message});
  }
});

turmaRouter.delete('/professor/:idTurma', async (request, response) => {
  try{
    const { idTurma } = request.params;
    console.log('Id Turma delete: ' + idTurma);

    const professorRepository = getRepository(Turma);
    
    const turma = await professorRepository.findOne(idTurma);

    if(!turma){
      throw new Error('The class does not exist');
    }

    await professorRepository.save({
      id: turma.id,
      id_professor: null,
      id_escola: turma.id_escola,
      nome: turma.nome,
      hora_inicio: turma.hora_inicio,
      hora_fim: turma.hora_fim,
    });
    return response.status(201).send();

  }catch(err){
    return response.status(400).json({error: err.message})
  }
})

turmaRouter.put('/professor/:idTurma', async (request, response) => {
  const { idTurma } = request.params;
  const { id_professor } = request.body;

  console.log('Id Turma put: ' + idTurma);
  console.log('Id professor put: ' + id_professor);

  const professorRepository = getRepository(Turma);
    
    const turma = await professorRepository.findOne(idTurma);

    if(!turma){
      throw new Error('The class does not exist');
    }

    const newClassTeacher = await professorRepository.save({
      id: turma.id,
      id_professor: id_professor,
      id_escola: turma.id_escola,
      nome: turma.nome,
      hora_inicio: turma.hora_inicio,
      hora_fim: turma.hora_fim,
    });
    return response.status(200).json(newClassTeacher);

})

export default turmaRouter;