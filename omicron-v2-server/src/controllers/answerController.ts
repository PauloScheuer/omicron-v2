import { Request, Response } from 'express';
import knex from '../database/connection';

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
      const question = Number(req.query.question);
      const user = Number(req.query.user);
      const data = await knex('answers')
        .select()
        .limit(perPage)
        .offset(offset)
        .where('idQuestion', '=', question)
        .or.where('idUser', '=', user)
        .orderBy('whenAnswer', 'desc');

      if (data.length === 0) {
        throw new Error('Sem respostas');
      }

      res.status(200).send({ message: 'Respostas encontradas', answers: data });
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
