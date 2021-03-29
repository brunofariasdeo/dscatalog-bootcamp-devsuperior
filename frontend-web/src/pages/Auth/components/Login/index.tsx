import ButtonIcon from 'core/components/ButtonIcon';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AuthCard from '../Card';
import './styles.scss';

type FormData = {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = ( data: FormData ) => {
    console.log(data);
  }

  return (
    <AuthCard title = "login">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <input 
          className="form-control input-base margin-bottom-30"
          name="email"
          placeholder="Email"
          ref={register}
          type="email" 
        />
        <input 
          className="form-control input-base"
          name="password"
          placeholder="Senha"
          ref={register}
          type="password" 
        />
        <Link to="/admin/auth/recover" className="login-recover-link">
          Esqueci a senha
        </Link>
        <div className="login-submit">
          <ButtonIcon text="Logar" />
        </div>
        <div className="text-center">
          <span className="not-registered">
            Não tem cadastro?
          </span>
          <Link to="/admin/auth/register" className="login-link-register">
            Cadastrar
          </Link>
        </div>
      </form>
    </AuthCard>
  )
}

export default Login;