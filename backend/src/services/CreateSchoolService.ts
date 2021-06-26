import { getRepository } from "typeorm";

import Escolas from "../models/Escola";


interface Request {
  nome: string;
  id_diretor: string;
  
}
class CreateSchoolService {
  public async execute({nome, id_diretor}: Request): Promise<any> {

    const schoolRepository = getRepository(Escolas)

    const escola = schoolRepository.create({nome, id_diretor})

    await schoolRepository.save(escola);

    return escola;
  }
}

export default CreateSchoolService;