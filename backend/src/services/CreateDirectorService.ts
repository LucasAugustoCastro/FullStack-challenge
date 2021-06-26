import { getRepository } from "typeorm";

import { hash } from 'bcryptjs';
import Diretor from "../models/Diretor";
import CreatePersonService from "./CreatePersonService";
import diretorRouter from "../routes/diretor.routes";


interface Request {
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  password: string;
  
}
class CreateDirectorService {
  public async execute({nome, cpf, telefone, email, password}: Request): Promise<any> {

    const createPerson = new CreatePersonService();

    const pessoa = await createPerson.execute({nome, cpf, telefone, email, password});

    const diretorRepository = getRepository(Diretor);

    const diretor = diretorRepository.create({id_pessoa: pessoa.id})

    await diretorRepository.save(diretor);

    diretor.pessoa = pessoa;
    return diretor;
  }
}

export default CreateDirectorService;