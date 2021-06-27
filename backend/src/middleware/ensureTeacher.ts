import {Request, Response, NextFunction} from 'express';
import { getRepository } from 'typeorm';
import Professor from '../models/Professor';


export default function ensureTeacher(request: Request, response: Response, next: NextFunction): void {

 const id = request.person.id;

 const professorRepository = getRepository(Professor);

 const professor = professorRepository.findOne(id);
 
 if(!professor){
   throw new Error('You are not authorized to do that')
 }
 return next();

}