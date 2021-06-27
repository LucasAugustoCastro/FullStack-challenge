import { getManager, getRepository } from "typeorm";

import Aluno from "../models/Aluno";
import CreatePersonService from "./CreatePersonService";


interface Request {
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  password: string;
  nome_responsavel: string;
  telefone_responsavel: string;
  
}
class CreateAlunoService {
  public async execute({nome, cpf, telefone, email, password, nome_responsavel, telefone_responsavel }: Request): Promise<any> {

    const createPerson = new CreatePersonService();

    const pessoa = await createPerson.execute({nome, cpf, telefone, email, password});

    const alunoRepository = getRepository(Aluno);
    const aluno = alunoRepository.create({id_pessoa: pessoa.id, nome_responsavel, telefone_responsavel})

    await alunoRepository.save(aluno);

    aluno.pessoa = pessoa;
    return aluno;
  }
}

export default CreateAlunoService;