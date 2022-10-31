import React, { Dispatch, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getToken} from '../utils/getAttributes';
import { Action, ActionWithoutParam } from '../utils/types';
import {logout} from '../store/actions/user';
import { useHistory } from 'react-router-dom';

const Header = (props:any) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const logged = props.token !== '';

  const history = useHistory();

  const handleLogout = ()=>{
    props.onLogout()
    alert('Logout realizado')
    history.push('/')
  }

  return (
    <header className="absolute w-full top-0 bg-primary text-light flex h-28 justify-between items-center rounded-b">
      <span className="cursor-pointer font-extrabold text-3xl md:ml-16 ml-8">
        Omicron
      </span>
      <div
        className="text-light cursor-pointer md:hidden mr-8"
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        {isOpenMenu ? <FiX size={32} /> : <FiMenu size={32} />}
      </div>
      <section
        style={{ transition: 'left 1s' }}
        className={`bg-primaryDark border-r-2 border-secundary w-4/5 z-20 h-screen flex flex-col fixed transition-all top-0 justify-start items-center ${
          isOpenMenu ? 'left-0' : '-left-full'
        } md:mr-16 md:flex md:flex-row md:static md:bg-primary md:h-auto md:w-auto md:justify-between md:border-0`}
      >
        <div className="md:mt-0 mt-8 cursor-pointer mr-6 font-semibold text-xl">
          <Link to="/">Home</Link>
        </div>
        <div className="md:mt-0 mt-8 cursor-pointer mr-6 font-semibold text-xl">
          <Link to="/conteudos">Conteúdos</Link>
        </div>
        <div className="md:mt-0 mt-8 cursor-pointer mr-6 font-semibold text-xl">
          <Link to="/descubra">Descubra+</Link>
        </div>
        <div className="md:mt-0 mt-8 cursor-pointer mr-6 font-semibold text-xl">
          <Link to="/forum">Fórum</Link>
        </div>
        {logged ?
          <>
            <div className="md:mt-0 mt-8 cursor-pointer mr-6 font-semibold text-xl">
              <Link to="/userpage">Userpage</Link>
            </div>
            <div className="md:mt-0 mt-8 cursor-pointer mr-6 font-semibold text-xl">
              <p onClick={()=>handleLogout()}>Logout</p>
            </div>
          </>
        :
          <div className="md:mt-0 mt-8 cursor-pointer mr-6 font-semibold text-xl">
            <Link to="/login">Login</Link>
          </div>
        }
      </section>
    </header>
  );
}

const mapStateToProps = (state:any)=>{
  return{token: getToken(state.user)}
}

const mapDispatchToProps = (dispatch:Dispatch<Action | ActionWithoutParam>) =>{
  return{
    onLogout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      dispatch(logout());
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header)
