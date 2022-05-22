import { Request, Response } from 'express';
import knex from '../database/connection';

class ContentController {
  async create(req: Request, res: Response) {
    try {
      const { name, text, level, index } = req.body;

      const contentExists = await knex('contents')
        .select('*')
        .where('nameContent', '=', name);
      if (contentExists.length !== 0) {
        throw new Error('Nome já cadastrado');
      }

      const newContent = {
        nameContent: name,
        textContent: text,
        levelContent: level,
        indexContent: index
      };
      const idContent = await knex('contents').insert(newContent);
      res.status(200).send({ message: 'Conteúdo cadastrado', id: idContent });
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const binaryTry = await knex('contents')
        .delete()
        .where('idContent', '=', id);
      if (binaryTry === 1) {
        res.status(200).send({ message: 'Conteúdo deletado' });
      } else {
        throw new Error('Erro ao deletar');
      }
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }
  async show(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const data = await knex('contents').select().where('idContent', '=', id);

      if (data.length === 0) {
        throw new Error('Contéudo não encontrado');
      }

      res
        .status(200)
        .send({ message: 'Conteúdo encontrado', content: data[0] });
    } catch (err) {
      res.status(400).send('Operação não realizada - ' + err);
    }
  }
  async index(req: Request, res: Response) {
    try {
      const level = Number(req.query.level);
      let data = null;
      if (isNaN(level) || level === 0) {
        data = await knex('contents').select('*');
      } else {
        data = await knex('contents')
          .select()
          .where('levelContent', '=', level);
      }
      res
        .status(200)
        .send({ message: 'Conteúdos encontrados', contents: data });
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }

  async edit(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const newText = req.body.newText;
      const newName = req.body.newName;
      const newLevel = req.body.newLevel;
      const newIndex = req.body.newIndex;

      const contentExists = await knex('contents')
        .select('*')
        .where('idContent', '=', id);
      if (contentExists.length === 0) {
        throw new Error('Conteúdo não encontrado');
      }

      const newData = await knex('contents')
        .update({
          textContent: newText,
          nameContent: newName,
          levelContent: newLevel,
          indexContent: newIndex,
        })
        .where('idContent', '=', id)
        .returning('*');
      res.status(200).send({ message: 'Conteúdo editado!', content: newData });
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }
}

export default ContentController;
