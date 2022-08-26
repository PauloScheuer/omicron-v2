import { Request, Response } from 'express';
import knex from '../database/connection';

class DiscoverController {
  async create(req: Request, res: Response) {
    try {
      const { name, text } = req.body;

      const discoverExists = await knex('discovers')
        .select('*')
        .where('nameDiscover', '=', name);
      if (discoverExists.length !== 0) {
        throw new Error('Nome já cadastrado');
      }

      const newDiscover = {
        namediscover: name,
        textdiscover: text,
      };
      const idDiscover = await knex('discovers').insert(newDiscover);
      res.status(200).send({ message: 'Conteúdo (descubra+) cadastrado', id: idDiscover });
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const binaryTry = await knex('discovers')
        .delete()
        .where('idDiscover', '=', id);
      if (binaryTry === 1) {
        res.status(200).send({ message: 'Conteúdo (descubra+) deletado' });
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
      const data = await knex('discovers').select().where('idDiscover', '=', id);

      if (data.length === 0) {
        throw new Error('Conteúdo (descubra+) não encontrado');
      }

      res
        .status(200)
        .send({ message: 'Conteúdo (descubra+) encontrado', discover: data[0] });
    } catch (err) {
      res.status(400).send('Operação não realizada - ' + err);
    }
  }
  async index(req: Request, res: Response) {
    try {
      const data = await knex('discovers').select('*');
      res
        .status(200)
        .send({ message: 'Conteúdos (descubra+) encontrados', discovers: data });
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }

  async edit(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const newText = req.body.newText;
      const newName = req.body.newName;

      const discoverExists = await knex('discovers')
        .select('*')
        .where('idDiscover', '=', id);
      if (discoverExists.length === 0) {
        throw new Error('Conteúdo (descubra+) não encontrado');
      }

      const newData = await knex('discovers')
        .update({
          textdiscover: newText,
          namediscover: newName,
        })
        .where('idDiscover', '=', id)
        .returning('*');
      res.status(200).send({ message: 'Conteúdo (descubra+) editado!', discover: newData });
    } catch (err) {
      res.status(400).send({ message: 'Operação não realizada - ' + err });
    }
  }
}

export default DiscoverController;
