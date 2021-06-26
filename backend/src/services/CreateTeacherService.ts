import { getRepository } from "typeorm";

import Professor from "../models/Professor";
import CreatePersonService from "./CreatePersonService";


interface Request {
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  password: string;
  
}
class CreateProfessorService {
  public async execute({nome, cpf, telefone, email, password}: Request): Promise<any> {

    const createPerson = new CreatePersonService();

    const pessoa = await createPerson.execute({nome, cpf, telefone, email, password});

    const professorRepository = getRepository(Professor);

    const professor = professorRepository.create({id_pessoa: pessoa.id})

    await professorRepository.save(professor);

    professor.pessoa = pessoa;
    return professor;
  }
}

export default CreateProfessorService;