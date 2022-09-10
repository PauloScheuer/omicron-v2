import { Request, Response } from 'express';
import knex from '../database/connection';

enum ParamOrderType{
  date = 0,
  likes = 1
}

enum KindOrderType{
  asc = 0,
  desc = 1
}

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
      const questionExists = await knex('questions')
        .select('*')
        .where('idQuestion', '=', id);
      if (questionExists.length === 0) {
        throw new Error('Questão não existe');
      }

      const data = await knex('questions')
        .select()
        .where('idQuestion', '=', id);
      res
        .status(200)
        .send({ message: 'Questão encontrada', question: data[0] });
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

      const total = await knex('questions').count();
      const pages = Math.ceil(Number(total[0]['count(*)']) / perPage);

      let order;
      let by;
      if(Number(req.query.order) == ParamOrderType.date){
        order = 'whenQuestion'
      }else{
        order = 'whenQuestion' //todo
      }

      if(Number(req.query.by) == KindOrderType.asc){
        by = 'asc'
      }else{
        by = 'desc'
      }

      const data = await knex('questions')
        .join('users','users.idUser','=','questions.idUser')
        .join('contents','contents.idContent','=','questions.idContent')
        .select('titleQuestion','textQuestion','nameUser','whenQuestion')
        .limit(perPage)
        .offset(offset)
        .where('indexContent', '=', content)
        .or.where('users.idUser', '=', user)
        .orderBy(order, by);

      if (data.length === 0) {
        throw new Error('Questões não encontradas');
      }

      const questions = data.map(q=>{
        return{
          title:q.titleQuestion,
          text:q.textQuestion,
          when:q.whenQuestion,
          user:q.nameUser,
          likes:49
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
