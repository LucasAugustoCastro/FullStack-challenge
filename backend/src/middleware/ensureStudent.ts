import {Request, Response, NextFunction} from 'express';
import { getRepository } from 'typeorm';
import Aluno from '../models/Aluno';


export default function ensureStudent(request: Request, response: Response, next: NextFunction): void {

 const id = request.person.id;

 const alunoRepository = getRepository(Aluno);

 const aluno = alunoRepository.findOne(id);
 
 if(!aluno){
   throw new Error('You are not authorized to do that')
 }
 return next();

}