import { getRepository } from "typeorm";

import Turma from "../models/Turma";


interface Request {
  nome: string;
  id_professor: string;
  id_escola: string;
  hora_inicio: string;
  hora_fim: string;
  
}
class CreateClassService {
  public async execute({id_professor, id_escola, nome, hora_inicio, hora_fim}: Request): Promise<any> {


    const turmaRepository = getRepository(Turma);

    const turma = turmaRepository.create({id_professor, id_escola, nome, hora_fim, hora_inicio})

    await turmaRepository.save(turma);
    
    return turma;
  }
}

export default CreateClassService;