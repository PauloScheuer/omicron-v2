import express from 'express';
import { celebrate, Joi } from 'celebrate';

import UserController from './controllers/userController';
import ContentController from './controllers/contentController';
import QuestionController from './controllers/questionController';
import AnswerController from './controllers/answerController';
import LikeController from './controllers/likeController';
import DiscoverController from './controllers/discoverController';
import { authUser, authAdmin } from './middlewares/auth';

const routes = express.Router();

const userController = new UserController();
const contentController = new ContentController();
const questionController = new QuestionController();
const answerController = new AnswerController();
const likeController = new LikeController();
const discoverController = new DiscoverController();

//routes usuário
routes.post(
  '/user/create',
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required().max(200),
        email: Joi.string().required().max(100),
        key: Joi.string().required().max(32),
        level: Joi.number().required().max(3),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  userController.create
);
routes.delete('/user/delete/:id', authUser, userController.delete);
routes.get('/user/show/:id', userController.show);
routes.put(
  '/user/edit/:id',
  celebrate(
    {
      body: Joi.object().keys({
        newEmail: Joi.string().required().max(100),
        newName: Joi.string().required().max(200),
        newLevel: Joi.number().required().max(3),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  authUser,
  userController.edit
);
routes.patch(
  '/user/edit-key/:id',
  celebrate(
    {
      body: Joi.object().keys({
        oldKey: Joi.string().required().max(32),
        newKey: Joi.string().required().max(32),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  authUser,
  userController.editKey
);
routes.post(
  '/user/login',
  celebrate(
    {
      body: Joi.object().keys({
        emailUser: Joi.string().required().max(100),
        keyUser: Joi.string().required().max(32),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  userController.login
);

//routes content
routes.post(
  '/content/create',
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required().max(100),
        text: Joi.string().required().max(2000),
        level: Joi.number().required().max(3),
        index: Joi.number().required()
      }),
    },
    {
      abortEarly: false,
    }
  ),
  contentController.create
);
routes.delete('/content/delete/:id', authAdmin, contentController.delete);
routes.get('/content/show/:id', contentController.show);
routes.get('/content/index', contentController.index);
routes.put(
  '/content/edit/:id',
  celebrate(
    {
      body: Joi.object().keys({
        newText: Joi.string().required().max(2000),
        newName: Joi.string().required().max(100),
        newLevel: Joi.number().required().max(3),
        newIndex: Joi.number().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  authAdmin,
  contentController.edit
);

//routes questions

routes.post(
  '/question/create',
  celebrate(
    {
      body: Joi.object().keys({
        title: Joi.string().required().max(100),
        text: Joi.string().required().max(1000),
        user: Joi.number().required(),
        content: Joi.number().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  authUser,
  questionController.create
);
routes.delete('/question/delete/:id', authUser, questionController.delete);
routes.get('/question/show/:id', questionController.show);
routes.get('/question/index', questionController.index);
routes.put(
  '/question/edit/:id',
  celebrate(
    {
      body: Joi.object().keys({
        newTitle: Joi.string().required().max(100),
        newText: Joi.string().required().max(1000),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  authUser,
  questionController.edit
);
//routes answers

routes.post(
  '/answer/create',
  celebrate(
    {
      body: Joi.object().keys({
        text: Joi.string().required().max(1000),
        user: Joi.number().required(),
        question: Joi.number().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  authUser,
  answerController.create
);
routes.delete('/answer/delete/:id', authUser, answerController.delete);
routes.get('/answer/show/:id', answerController.show);
routes.get('/answer/index', answerController.index);
routes.patch(
  '/answer/edit/:id',
  celebrate(
    {
      body: Joi.object().keys({
        newText: Joi.string().required().max(1000),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  authUser,
  answerController.edit
);

//like routes

routes.post('/like/create', authUser, likeController.create);
routes.delete('/like/delete/:id', authUser, likeController.delete);
routes.get('/like/index', likeController.index);

//discover routes
routes.post(
  '/discover/create',
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required().max(100),
        text: Joi.string().required().max(2000),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  authAdmin,
  discoverController.create
);
routes.delete('/discover/delete/:id', authAdmin, discoverController.delete);
routes.get('/discover/show/:id', discoverController.show);
routes.get('/discover/index', discoverController.index);
routes.put(
  '/discover/edit/:id',
  celebrate(
    {
      body: Joi.object().keys({
        newText: Joi.string().required().max(2000),
        newName: Joi.string().required().max(100),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  authAdmin,
  discoverController.edit
);

export default routes;
