import { Request, Response } from 'express';
import knex from '../database/connection';

function capitalize(word: String) {
  return word[0].toUpperCase() + word.slice(1);
}

class LikeController {
  async create(req: Request, res: Response) {
    try {
      const { type, user, id } = req.body;
      const capsType = capitalize(type);
      const userExists = await knex('users')
        .select('*')
        .where('idUser', '=', user);
      if (userExists.length === 0) {
        throw new Error('Usuário não existe');
      }

      const typeExists = await knex(`${type}s`)
        .select('*')
        .where(`id${capsType}`, '=', id);
      if (typeExists.length === 0) {
        throw new Error('Publicação não existe');
      }

      const likeExists = await knex('likes')
        .select('*')
        .where('idUser', '=', user)
        .and.where(`id${capsType}`, '=', id);
      if (likeExists.length !== 0) {
        throw new Error('Usuário já curtiu');
      }

      const when = new Date();
      const newLike = {
        whenLike: when,
        idUser: user,
      };
      let newLikeWithSubject = {};
      if (type === 'question') {
        newLikeWithSubject = {
          ...newLike,
          idQuestion: id,
        };
      } else {
        newLikeWithSubject = {
          ...newLike,
          idAnswer: id,
        };
      }
      const idLike = await knex('likes')
        .insert(newLikeWithSubject)
        .returning('idLike');
      res.status(200).send({ message: 'Like cadastrado', id: idLike });
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const likeExists = await knex('likes')
        .select('*')
        .where('idLike', '=', id);
      if (likeExists.length === 0) {
        throw new Error('Like não existe');
      }

      await knex('likes').delete().where('idLike', '=', id);
      res.status(200).send({ message: 'Like deletado' });
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }
  async index(req: Request, res: Response) {
    try {
      const page = Number(req.query.page);
      let perPage = null;
      if (req.query.perPage === undefined) {
        perPage = 5;
      } else {
        perPage = Number(req.query.perPage);
      }
      const offset = page * perPage - perPage;

      const question = Number(req.query.question);
      const answer = Number(req.query.answer);
      const user = Number(req.query.user);

      const data = await knex('likes')
        .select()
        .limit(perPage)
        .offset(offset)
        .where('idQuestion', '=', question)
        .or.where('idUser', '=', user)
        .or.where('idAnswer', '=', answer)
        .orderBy('whenLike', 'desc');

      if (data.length === 0) {
        throw new Error('Sem likes');
      }

      res.status(200).send({ message: 'Likes encontrados', likes: data });
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }
}

export default LikeController;
