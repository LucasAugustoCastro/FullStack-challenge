import {Request, Response, NextFunction} from 'express';
import { getRepository } from 'typeorm';
import Diretor from '../models/Diretor';


export default function ensureDirector(request: Request, response: Response, next: NextFunction): void {

 const id = request.person.id;

 const diretorRepository = getRepository(Diretor);

 const diretor = diretorRepository.findOne(id);
 
 if(!diretor){
   throw new Error('You are not authorized to do that')
 }
 return next();

}