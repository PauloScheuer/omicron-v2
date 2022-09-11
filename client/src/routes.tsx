import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Login from './pages/Login';
import Register from './pages/Register';
import Forum from './pages/Forum';
import Contents from './pages/Contents';
import Content from './pages/Content';
import Userpage from './pages/Userpage';
import ForumList from './pages/ForumList';
import Answers from './pages/Forum/Answers'

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={Discover} path="/descubra" exact />
      <Route component={Login} path="/login" exact />
      <Route component={Register} path="/cadastro" exact />
      <Route component={ForumList} path="/forum" exact />
      <Route component={Forum} path="/forum/:index" exact />
      <Route component={Answers} path="/forum/respostas/:id" exact />
      <Route component={Contents} path="/conteudos" exact />
      <Route component={Content} path="/conteudos/:index" exact />
      <Route component={Userpage} path="/userpage" exact />
    </BrowserRouter>
  );
};

export default Routes;
