import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { user, admin } from '../config/auth';

// Função para autenticação de um usuário comum
const authUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log(req.headers.authorization);
  if (!authHeader) {
    return res.status(401).send({ error: 'Nenhum token recebido' });
  }
  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(401).send({ error: 'Formato do token inválido' });
  }
  const [scheme, token] = parts;
  if (!scheme.includes('BEARER')) {
    return res.status(401).send({ error: 'Token errado' });
  }
  jwt.verify(token, user, (err, decoded: any) => {
    if (err) {
      return res.status(401).send({ error: 'Token inválido' });
    }
    req.body.idToken = decoded.id;
    return next();
  });
};

// Função para autenticação de um usuário administrador
const authAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: 'Nenhum token recebido' });
  }
  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(401).send({ error: 'Formato do token inválido' });
  }
  const [scheme, token] = parts;
  if (!scheme.includes('BEARER')) {
    return res.status(401).send({ error: 'Token errado' });
  }
  jwt.verify(token, admin, (err, decoded: any) => {
    if (err) {
      return res.status(401).send({ error: 'Token inválido' });
    }
    req.body.idToken = decoded.id;
    return next();
  });
};
export { authUser, authAdmin};
