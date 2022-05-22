import React from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Layout from '../../components/Layout';

const Userpage = () => {
  return (
    <Layout>
      <div className="flex justify-between md:px-32 px-10 py-20 items-baseline">
        <form className="bg-white pt-20  md:px-24 px-10 flex flex-col rounded-xl items-center">
          <h1 className="font-semibold text-4xl text-primaryDark">Editar dados</h1>
          <Input placeholder='Nome' name="name" value="" setValue={()=>{}} style={`w-64 mt-8`}/>
          <Input placeholder='Email' name="email" value="" setValue={()=>{}} style={`w-64 mt-4`} type="email"/>
          <Input placeholder='Escolaridade' name="level" value={0} setValue={()=>{}} style={`w-64 mt-4`}/>
          <Input placeholder='Insira sua senha' name="key" value="" setValue={()=>{}} style={`w-64 mt-4`} type="password"/>
          <Button value="Editar" action={()=>{}} style={`my-8 bg-primary`}/>
        </form>
        <form className="bg-white pt-20  md:px-24 px-10 flex flex-col rounded-xl items-center">
          <h1 className="font-semibold text-4xl text-primaryDark">Editar senha</h1>
          <Input placeholder='Senha atual' name="keyNow" value="" setValue={()=>{}} style={`w-64 mt-8`} type="password"/>
          <Input placeholder='Nova senha' name="keyThen" value="" setValue={()=>{}} style={`w-64 mt-4`} type="password"/>
          <Input placeholder='Confirme a nova senha' name="keyThenConfirm" value="" setValue={()=>{}} style={`w-64 mt-4`} type="password"/>
          <Button value="Editar" action={()=>{}} style={`my-8 bg-primary`}/>
        </form>
      </div>
    </Layout>
  );
}
export default Userpage;
