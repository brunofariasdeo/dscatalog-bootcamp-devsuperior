import ButtonIcon from 'core/components/ButtonIcon';
import { saveSessionData } from 'core/utils/auth';
import { makeLogin } from 'core/utils/request';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import AuthCard from '../Card';
import './styles.scss';

type FormData = {
  username: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [ hasError, setHasError ] = useState(false);
  const history = useHistory();

  const onSubmit = ( data: FormData ) => {
    makeLogin(data)
      .then( response => {
        setHasError(false);
        saveSessionData(response.data);
        history.push('/admin');
      })
      .catch(() => {
        setHasError(true);
      });
  }

  return (
    <AuthCard title = "login">
      { hasError && (
        <div className="alert alert-danger mt-5">
          Usuário ou senha inválidos!
        </div>
      )}

      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <input 
          className="form-control input-base margin-bottom-30"
          name="username"
          placeholder="Email"
          ref={register({ required: true })}
          type="email" 
        />
        <input 
          className="form-control input-base"
          name="password"
          placeholder="Senha"
          ref={register({ minLength: 5, required: true })}
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