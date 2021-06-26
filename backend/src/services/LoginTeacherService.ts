import { getRepository } from "typeorm";

import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken';
import authConfig from "../config/auth";
import Professor from "../models/Professor";

interface Request {
  email: string;
  password: string;
}
interface Response {
  professor: Professor;
  token: string;
}

class LoginTeacherService {

  public async execute({email, password}: Request): Promise<Response>{
    const professorRepository = getRepository(Professor);

    const professor = await professorRepository.createQueryBuilder("professores")
    .innerJoinAndSelect("professores.pessoa", "pessoa")
    .where("pessoa.email = :email", { email })
    .getOne();


    if(!professor){
      throw new Error('Incorrect email/password combination');
    }
    let passwordMached = false;
    if(professor.pessoa.password !== undefined){
       passwordMached = await compare(password, professor.pessoa.password);
    }

    if(!passwordMached){
      throw new Error('Incorrect email/password combination');

    }
    delete professor.pessoa.password;

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: professor.id,
      expiresIn,
    })

    return {professor, token};


  }


}

export default LoginTeacherService;