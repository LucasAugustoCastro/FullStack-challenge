import { Router } from 'express';
import { getRepository } from 'typeorm';
import ensureDirector from '../middleware/ensureDirector';
import Professor from '../models/Professor';
import CreateTeacherService from '../services/CreateTeacherService';
import LoginTeacherService from '../services/LoginTeacherService';

const professorRouter = Router();


professorRouter.get('/:id', async (request, response) => {
  try{
    const {id} = request.params;

    const professorRepository = getRepository(Professor);

    const professor = professorRepository.findOne(id);

    return response.status(200).json(professor);
  }catch(err){
    return response.status(400).json({ error: err.message})
  }
})

professorRouter.get('/escola/:id_escola', async (request, response) => {
  try{
    const {id_escola} = request.params;
    const professorRepository = getRepository(Professor);
    const professores = await professorRepository.find({where: {id_escola}});
    return response.status(200).json(professores);
  }catch(err){
    return response.status(400).json({error: err.message});
  }
})

professorRouter.post('/' , async (request, response) =>{
  try{
    const {nome, cpf, telefone, id_escola, email, password} = request.body;

    const createTeacher = new CreateTeacherService();

    const teacher = await createTeacher.execute({
      nome, 
      cpf, 
      id_escola,
      telefone, 
      email, 
      password,
    });

    return response.status(200).json(teacher)
  }catch (err) {
    return response.status(400).json({ error: err.message });
  }


});

professorRouter.post('/login', async (request, response) => {
  try{
    const {email, password} = request.body;

    const alunoLogin = new LoginTeacherService()

    const {professor, token} = await alunoLogin.execute({email, password});

    return response.status(200).json({professor, token});

  }catch (err){
    return response.status(400).json({error: err.message });
  }
})

export default professorRouter;