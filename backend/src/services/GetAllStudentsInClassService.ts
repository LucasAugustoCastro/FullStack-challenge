import { getRepository } from "typeorm";

import TurmaAluno from "../models/TurmaAluno";


interface Request {
  id_turma: string;
  
}
class GetAllStudentsInClassService {
  public async execute({id_turma}: Request): Promise<any> {


    const turmaAlunoRepository = getRepository(TurmaAluno);

    const allStudentsInClass = await  turmaAlunoRepository.find({where: { id_turma }});
    


    
    
    return allStudentsInClass;
  }
}

export default GetAllStudentsInClassService;