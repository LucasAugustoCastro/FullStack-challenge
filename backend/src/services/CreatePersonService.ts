import { getRepository } from "typeorm";

import { hash } from 'bcryptjs';
import Pessoas from "../models/Pessoas";


interface Request {
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  password: string;
  
}
class CreatePersonService {
  public async execute({nome, cpf, telefone, email, password}: Request): Promise<any> {

    const pessoaRepository = getRepository(Pessoas);

    const checkEmailPessoaExists = await pessoaRepository.findOne({
      where: {email}
    });

    if(checkEmailPessoaExists)
      throw new Error('Email address already used');
    
    const checkCpfPessoaExists = await pessoaRepository.findOne({
      where: { cpf },
    });

    if (checkCpfPessoaExists) {
      throw new Error('CPF already used');
    }

    const hashedPassword = await hash(password, 8);

    const pessoa = pessoaRepository.create({
      nome,
      email,
      cpf,
      telefone,
      password: hashedPassword,
    });

    await pessoaRepository.save(pessoa);

    delete pessoa.password;
    return pessoa;
  }
}

export default CreatePersonService;