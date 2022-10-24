import { Request, Response } from 'express';
import knex from '../database/connection';
import { KindOrderType, ParamOrderType } from '../utils/types';

class QuestionController {
  async create(req: Request, res: Response) {
    try {
      const { title, text, user, content } = req.body;

      const userExists = await knex('users')
        .select('*')
        .where('idUser', '=', user);
      if (userExists.length === 0) {
        throw new Error('Usuário não existe');
      }
      const contentExists = await knex('contents')
        .select('*')
        .where('idContent', '=', content);
      if (contentExists.length === 0) {
        throw new Error('Conteúdo não existe');
      }

      const when = new Date();

      const newQuestion = {
        titleQuestion: title,
        textQuestion: text,
        whenQuestion: when,
        idUser: user,
        idContent: content,
      };
      const idQuestion = await knex('questions')
        .insert(newQuestion)
        .returning('idQuestion');
      res.status(200).send({ message: 'Questão cadastrada', id: idQuestion });
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const questionExists = await knex('questions')
        .select('*')
        .where('idQuestion', '=', id);
      if (questionExists.length === 0) {
        throw new Error('Questão não existe');
      }

      await knex('questions').delete().where('idQuestion', '=', id);
      res.status(200).send({ message: 'Questão deletada' });
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }
  async show(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = Number(req.query.user);

      const data = await knex.with('new_table',aux=>{
        aux.from('questions')
        .join('users','users.idUser','=','questions.idUser')
        .join('contents','contents.idContent','=','questions.idContent')
        .leftJoin('likes','likes.idQuestion','=','questions.idQuestion')
        .select(
          'questions.idQuestion',
          'titleQuestion',
          'textQuestion',
          'nameUser',
          'whenQuestion',
          'idLike',
          {'userLiked':knex.raw('likes.idUser = ?',[user])}
        )
        .rank('rank', knex.raw('order by ?? desc', [knex.raw('likes.idUser = ?',[user])]))
        .where('questions.idQuestion', '=', id)
      })
      .select(
        '*',
        {'likes':knex.raw('COUNT(idLike)')}
      )
      .having('rank','=',1)
      .groupBy('idQuestion')
      .from('new_table');
      
      if (data.length === 0) {
        throw new Error('Questão não existe');
      }

      const question = {
          title:data[0].titleQuestion,
          text:data[0].textQuestion,
          when:data[0].whenQuestion,
          user:data[0].nameUser,
          id:data[0].idQuestion,
          likes:data[0].likes || 0,
          hasLiked:data[0].userLiked > 0
        }

      res.status(200).send({ message: 'Questão encontrada', question});
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
      const content = Number(req.query.content);
      const user = Number(req.query.user);

      const total = await knex('questions').count()
        .join('contents','contents.idContent','=','questions.idContent')
        .where('indexContent', '=', content)
        .or.where('questions.idUser', '=', user);
      const pages = Math.ceil(Number(total[0]['count(*)']) / perPage);

      let order;
      let by;
      if(Number(req.query.order) == ParamOrderType.date){
        order = 'whenQuestion'
      }else{
        order = 'likes'
      }

      if(Number(req.query.by) == KindOrderType.asc){
        by = 'asc'
      }else{
        by = 'desc'
      }

      const data = await knex.with('new_table',aux=>{
        aux.from('questions')
        .join('users','users.idUser','=','questions.idUser')
        .join('contents','contents.idContent','=','questions.idContent')
        .leftJoin('likes','likes.idQuestion','=','questions.idQuestion')
        .select(
          'questions.idQuestion',
          'titleQuestion',
          'textQuestion',
          'nameUser',
          'whenQuestion',
          'likes.idLike',
          {'userLiked':knex.raw('likes.idUser = ?',[user])},
        )
        .where('indexContent', '=', content)
        .rank('rank', knex.raw('partition by ?? order by ?? desc', ['questions.idQuestion',knex.raw('likes.idUser = ?',[user])]))
      })
      .select(
        '*',
        {'likes':knex.raw('COUNT(idLike)')}
      )
      .groupByRaw('idQuestion')
      .having('rank','=',1)
      .limit(perPage)
      .offset(offset)
      .orderBy(order, by)
      .from('new_table')


      if (data.length === 0) {
        throw new Error('Questões não encontradas');
      }

      const questions = data.map(q=>{
        return{
          title:q.titleQuestion,
          text:q.textQuestion,
          when:q.whenQuestion,
          user:q.nameUser,
          id:q.idQuestion,
          likes:q.likes || 0,
          hasLiked:q.userLiked > 0,
        }
      })

      res
        .status(200)
        .send({ message: 'Questões encontradas', questions, pages});
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }
  async edit(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const newTitle = req.body.newTitle;
      const newText = req.body.newText;

      const questionExists = await knex('questions')
        .select('*')
        .where('idQuestion', '=', id);
      if (questionExists.length === 0) {
        throw new Error('Questão não encontrada');
      }

      const newData = await knex('questions')
        .update({ titleQuestion: newTitle, textQuestion: newText })
        .where('idQuestion', '=', id)
        .returning('*');
      res.status(200).send({ message: 'Questão editada!', question: newData });
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }
}

export default QuestionController;
