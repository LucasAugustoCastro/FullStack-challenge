import { Router } from 'express';
import { getRepository } from 'typeorm';
import Escola from '../models/Escola';
import CreateSchoolService from '../services/CreateSchoolService';

const escolaRouter = Router();

escolaRouter.get('/', async (request, response)=>{

  const escolaReposity = getRepository(Escola);
  const escolas = await escolaReposity.find()


  return response.status(200).json(escolas);
});

escolaRouter.get('/:id', async (request, response)=>{
  const { id } = request.params

  const escolaReposity = getRepository(Escola);
  const escola = await escolaReposity.findOne(id)


  return response.status(200).json(escola);
});

escolaRouter.post('/', async (request, response) =>{
  try{
    const {nome, id_diretor} = request.body;
    
    const createAluno = new CreateSchoolService();

    const school = await createAluno.execute({
      nome, 
      id_diretor,
    });

    response.json(school)
  }catch (err) {
    return response.status(400).json({ error: err.message });
  }


});

export default escolaRouter;