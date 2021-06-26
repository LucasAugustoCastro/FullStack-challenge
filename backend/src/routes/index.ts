import { Router } from 'express';
import alunoRouter from './aluno.routes';
import diretorRouter from './diretor.routes';
import escolaRouter from './escola.routes';
import professorRouter from './professor.routes';
import turmaRouter from './turma.routes';


const routes = Router();

routes.use('/aluno', alunoRouter);
routes.use('/diretor', diretorRouter);
routes.use('/escola', escolaRouter);
routes.use('/professor', professorRouter);
routes.use('/turma', turmaRouter);

export default routes;


