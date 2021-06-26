import { getRepository } from "typeorm";

import TurmaAluno from "../models/TurmaAluno";


interface Request {
  id_aluno:string;
  id_turma:string;
  
}
class CreateStudentClassService {

  public async execute({id_turma, id_aluno}: Request): Promise<any> {

    const turmaAlunoRepository = getRepository(TurmaAluno);

    const turmaAluno = turmaAlunoRepository.create({id_turma, id_aluno})

    await turmaAlunoRepository.save(turmaAluno);
    return turmaAluno;
  }
}

export default CreateStudentClassService;