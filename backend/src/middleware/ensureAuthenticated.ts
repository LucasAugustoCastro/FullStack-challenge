import {Request, Response, NextFunction} from 'express';


import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {

  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new Error('Authorization token missing')
  }

  const [, token] = authHeader.split(' ');
  try{
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.person = {
      id: sub,
    }

    return next();
  }catch (err){
    throw new Error('Invalid authorization token')
  }

}