import { getRepository } from "typeorm";

import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken';
import authConfig from "../config/auth";
import Diretor from "../models/Diretor";

interface Request {
  email: string;
  password: string;
}
interface Response {
  diretor: Diretor;
  token: string;
}

class LoginDiretorService {

  public async execute({email, password}: Request): Promise<Response>{
    const diretorRepository = getRepository(Diretor);

    const diretor = await diretorRepository.createQueryBuilder("Diretores")
    .innerJoinAndSelect("Diretores.pessoa", "pessoa")
    .where("pessoa.email = :email", { email })
    .getOne();


    if(!diretor){
      throw new Error('Incorrect email/password combination');
    }
    let passwordMached = false;
    if(diretor.pessoa.password !== undefined){
       passwordMached = await compare(password, diretor.pessoa.password);
    }

    if(!passwordMached){
      throw new Error('Incorrect email/password combination');

    }
    delete diretor.pessoa.password;

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: diretor.id,
      expiresIn,
    })

    return {diretor, token};


  }


}

export default LoginDiretorService;