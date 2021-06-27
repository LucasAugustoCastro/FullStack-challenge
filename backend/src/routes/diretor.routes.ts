import { response, Router } from 'express';
import { getRepository } from 'typeorm';
import Diretor from '../models/Diretor';
import CreateDirectorService from '../services/CreateDirectorService';
import LoginDiretorService from '../services/LoginDirectorService';

const diretorRouter = Router();



diretorRouter.get('/:id', async (request, response) => {
  try{
    const { id } = request.params;

    const diretorRepository = getRepository(Diretor);

    const diretor = await diretorRepository.findOne(id);
    delete diretor?.pessoa.password;
    return response.status(200).json(diretor)

  }catch(err){
    return response.status(400).json({ error: err.message })
  }
})

diretorRouter.post('/', async (request, response) =>{
  try{
    const {nome, cpf, telefone, email, password} = request.body;

    const createDirector = new CreateDirectorService();

    const director = await createDirector.execute({
      nome, 
      cpf, 
      telefone, 
      email, 
      password,
    });

    response.json(director)
  }catch (err) {
    return response.status(400).json({ error: err.message });
  }


});

diretorRouter.post('/login', async (request, response) => {
  try{
    const {email, password} = request.body;

    const alunoLogin = new LoginDiretorService()

    const {diretor, token} = await alunoLogin.execute({email, password});

    return response.status(200).json({diretor, token});

  }catch (err){
    return response.status(400).json({error: err.message });
  }
})



export default diretorRouter;