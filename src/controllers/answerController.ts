import { Request, Response } from 'express';
import knex from '../database/connection';
import { KindOrderType, ParamOrderType } from '../utils/types';

class AnswerController {
  async create(req: Request, res: Response) {
    try {
      const { text, user, question } = req.body;

      const userExists = await knex('users')
        .select('*')
        .where('idUser', '=', user);
      if (userExists.length === 0) {
        throw new Error('Usuário não existe');
      }
      const questionExists = await knex('questions')
        .select('*')
        .where('idQuestion', '=', question);
      if (questionExists.length === 0) {
        throw new Error('Questão não existe');
      }

      const when = new Date();

      const newAnswer = {
        textAnswer: text,
        whenAnswer: when,
        idUser: user,
        idQuestion: question,
      };
      const idAnswer = await knex('answers')
        .insert(newAnswer)
        .returning('idAnswer');
      res.status(200).send({ message: 'Resposta cadastrada', id: idAnswer });
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const answerExists = await knex('answers')
        .select('*')
        .where('idAnswer', '=', id);
      if (answerExists.length === 0) {
        throw new Error('Resposta não existe');
      }

      await knex('answers').delete().where('idAnswer', '=', id);
      res.status(200).send({ message: 'Resposta deletada' });
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }
  async show(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const answerExists = await knex('answers')
        .select('*')
        .where('idAnswer', '=', id);
      if (answerExists.length === 0) {
        throw new Error('Resposta não existe');
      }

      const data = await knex('answers').select().where('idAnswer', '=', id);
      res.status(200).send({ message: 'Resposta encontrada', answer: data[0] });
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
      const question = Number(req.params.id);
      const user = Number(req.query.user);

      const total = await knex('answers').count()
        .where('idQuestion', '=', question)
        .or.where('answers.idUser', '=', user);
      const pages = Math.ceil(Number(total[0]['count(*)']) / perPage);

      let order;
      let by;
      if(Number(req.query.order) == ParamOrderType.date){
        order = 'whenAnswer'
      }else{
        order = 'whenAnswer' //todo
      }

      if(Number(req.query.by) == KindOrderType.asc){
        by = 'asc'
      }else{
        by = 'desc'
      }

      const data = await knex.with('new_table',aux=>{
        aux.from('answers')
        .join('users','users.idUser','=','answers.idUser')
        .leftJoin('likes','likes.idAnswer','=','answers.idAnswer')
        .select(
          'answers.idAnswer',
          'textAnswer',
          'nameUser',
          'whenAnswer',
          'likes.idLike',
          {'userLiked':knex.raw('likes.idUser = ?',[user])},
        )
        .where('answers.idQuestion', '=', question)
        .rank('rank', knex.raw('partition by ?? order by ?? desc', ['answers.idAnswer',knex.raw('likes.idUser = ?',[user])]))
      })
      .select(
        '*',
        {'likes':knex.raw('COUNT(idLike)')}
      )
      .groupByRaw('idAnswer')
      .having('rank','=',1)
      .limit(perPage)
      .offset(offset)
      .orderBy(order, by)
      .from('new_table')

      const answers = data.map(a=>{
        return{
          id:a.idAnswer,
          text:a.textAnswer,
          when:a.whenAnswer,
          user:a.nameUser,
          likes: a.likes || 0,
          hasLiked: a.userLiked > 0
        }
      })

      res.status(200).send({ message: 'Respostas encontradas', answers, pages});
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }
  async edit(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const newText = req.body.newText;

      const answerExists = await knex('answers')
        .select('*')
        .where('idAnswer', '=', id);
      if (answerExists.length === 0) {
        throw new Error('Resposta não encontrada');
      }

      const newData = await knex('answers')
        .update('textAnswer', newText)
        .where('idAnswer', '=', id)
        .returning('*');
      res.status(200).send({ message: 'Texto editado!', answer: newData });
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }
}

export default AnswerController;
