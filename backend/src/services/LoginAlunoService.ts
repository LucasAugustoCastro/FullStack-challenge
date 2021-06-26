import { getRepository } from "typeorm";

import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken';
import Aluno from "../models/Aluno";
import authConfig from "../config/auth";

interface Request {
  email: string;
  password: string;
}
interface Response {
  aluno: Aluno;
  token: string;
}

class LoginAlunoService {

  public async execute({email, password}: Request): Promise<Response>{
    const alunoRepository = getRepository(Aluno);

    const aluno = await alunoRepository.createQueryBuilder("alunos")
    .innerJoinAndSelect("alunos.pessoa", "pessoa")
    .where("pessoa.email = :email", { email })
    .getOne();


    if(!aluno){
      throw new Error('Incorrect email/password combination');
    }
    let passwordMached = false;
    if(aluno.pessoa.password !== undefined){
       passwordMached = await compare(password, aluno.pessoa.password);
    }

    if(!passwordMached){
      throw new Error('Incorrect email/password combination');

    }
    delete aluno.pessoa.password;

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: aluno.id,
      expiresIn,
    })

    return {aluno, token};


  }


}

export default LoginAlunoService;