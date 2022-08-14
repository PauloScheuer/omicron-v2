import { Request, Response } from 'express';
import knex from '../database/connection';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { user, admin } from '../config/auth';

const dataCipher = {
  alg: 'aes256',
  secret: 'keys',
};

const generateToken = (id: number, isAdmin: boolean) => {
  return jwt.sign({ id: String(id) }, isAdmin ? admin : user, { expiresIn: 172800 });
};

const toCrypt = (word: String) => {
  const cipher = crypto.createCipher(dataCipher.alg, dataCipher.secret);
  const strWord = String(word);
  cipher.update(strWord);
  return cipher.final('hex');
};

class UserController {
  async create(req: Request, res: Response) {
    try {
      const { name, email, key, level } = req.body;

      const cryptedKey = toCrypt(key);

      const userExists = await knex('users')
        .select('*')
        .where('emailUser', '=', email);
      if (userExists.length !== 0) {
        throw new Error('Email já cadastrado');
      }

      const newUser = {
        nameUser: name,
        emailUser: email,
        keyUser: cryptedKey,
        levelUser: level,
        isAdminUser: false,
      };
      const idUser = await knex('users').insert(newUser).returning('idUser');
      res.status(200).send({ message: 'Usuário cadastrado', id: idUser });
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const binaryTry = await knex('users').delete().where('idUser', '=', id);
      if (binaryTry === 1) {
        res.status(200).send({ message: 'Cadastro deletado' });
      } else {
        throw new Error('Erro ao deletar');
      }
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }
  async show(req: Request, res: Response) {
    try {
      let id = req.params.id;
      if (id == null){
        id = req.body.idToken;
      }
      const data = await knex('users').select('idUser','nameUser','emailUser','levelUser').where('idUser', '=', id);

      if (data.length === 0) {
        throw new Error('Usuário não encontrado');
      }

      res.status(200).send({ message: 'Usuário encontrado', user: data[0] });
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }

  async edit(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const newEmail = req.body.newEmail;
      const newName = req.body.newName;
      const newLevel = req.body.newLevel;
      const idToken = req.body.idToken;

      if (id !== idToken){
        throw new Error('Usuário não autenticado');
      }

      const userExists = await knex('users')
        .select('*')
        .where('idUser', '=', id);
      if (userExists.length === 0) {
        throw new Error('Usuário não encontrado');
      }

      const emailExists = await knex('users')
        .select('*')
        .where('emailUser', '=', newEmail);
      if ((emailExists.length !== 0) && (emailExists[0].idUser != id)) {
        throw new Error('Email já cadastrado');
      }

      const newData = await knex('users')
        .update({ emailUser: newEmail, nameUser: newName, levelUser: newLevel })
        .where('idUser', '=', id)
        .returning('*');
      res.status(200).send({ message: 'Usuário editado!', user: {emailUser:newEmail,nameUser:newName,levelUser:newLevel} });
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }

  async editKey(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const newKey = toCrypt(req.body.newKey);
      const oldKey = toCrypt(req.body.oldKey);

      //verify if the user exists
      const userExists = await knex('users')
        .select('*')
        .where('idUser', '=', id);
      if (userExists.length === 0) {
        throw new Error('usuário não encontrado');
      }

      if (userExists[0].keyUser !== oldKey) {
        throw new Error('você informou uma senha errada');
      }

      await knex('users').update('keyUser', newKey).where('idUser', '=', id);
      res.status(200).send({ message: 'Senha editada!' });
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }
  async login(req: Request, res: Response) {
    try {
      const emailUser = req.body.emailUser;
      const keyUser = toCrypt(req.body.keyUser);

      const userExists = await knex('users')
        .select('*')
        .where('emailUser', '=', emailUser);
      if (userExists.length === 0) {
        throw new Error('Usuário não encontrado');
      }
      if (userExists[0].keyUser !== keyUser) {
        throw new Error('Senha incorreta');
      }

      res.status(200).send({
        message: 'Usuário logado',
        idUser: userExists[0].idUser,
        nameUser: userExists[0].nameUser,
        emailUser: userExists[0].emailUser,
        levelUser: userExists[0].levelUser,
        token: generateToken(userExists[0].idUser, userExists[0].isAdmin),
      });
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }
}

export default UserController;
