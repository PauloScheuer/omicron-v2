import { Request, Response } from 'express';
import knex from '../database/connection';

function capitalize(word: String) {
  return word[0].toUpperCase() + word.slice(1);
}

class LikeController {
  async create(req: Request, res: Response) {
    try {
      const { type,idToken, id } = req.body;
      const capsType = capitalize(type);
      const userExists = await knex('users')
        .select('*')
        .where('idUser', '=', idToken);
      if (userExists.length === 0) {
        throw new Error('Usuário não existe');
      }

      const parent = await knex(`${type}s`)
        .select('*')
        .where(`id${capsType}`, '=', id);
      if (parent.length === 0) {
        throw new Error('Publicação não existe');
      }

      const likeExists = await knex('likes')
        .select('*')
        .where('idUser', '=', idToken)
        .and.where(`id${capsType}`, '=', id);
      if (likeExists.length !== 0) {
        throw new Error('Usuário já curtiu');
      }

      const when = new Date();
      const newLike = {
        whenLike: when,
        idUser: idToken,
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
        .insert(newLikeWithSubject);

      const count = await knex('likes').where(`likes.id${capsType}`,'=',id).count();

      res.status(200).send({ message: 'Like cadastrado', id: idLike[0], newCount:count[0]['count(*)'] });
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
      console.log(err)
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const like = await knex('likes')
        .select('*')
        .where('idLike', '=', id);
      if (like.length === 0) {
        throw new Error('Like não existe');
      }

      await knex('likes').delete().where('idLike', '=', id);

      const capsType = like[0].idAnswer == null ? 'Question' : 'Answer';
      const idParent = like[0]['id'+capsType];

      const count = await knex('likes').where(`likes.id${capsType}`,'=',idParent).count();

      res.status(200).send({ message: 'Like deletado', newCount:count[0]['count(*)'] });
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }
}

export default LikeController;
