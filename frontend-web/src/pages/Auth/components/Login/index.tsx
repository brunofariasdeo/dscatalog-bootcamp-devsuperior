import ButtonIcon from 'core/components/ButtonIcon';
import { saveSessionData } from 'core/utils/auth';
import { makeLogin } from 'core/utils/request';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import AuthCard from '../Card';
import './styles.scss';

type FormData = {
  username: string;
  password: string;
}

type LocationState = {
  from: string;
}

const Login = () => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const [ hasError, setHasError ] = useState(false);
  const history = useHistory();
  let location = useLocation<LocationState>();

  const { from } = location.state || { from: { pathname: "/admin"} };

  const onSubmit = ( data: FormData ) => {
    makeLogin(data)
      .then( response => {
        setHasError(false);
        saveSessionData(response.data);
        history.replace(from);
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
        <div className="margin-bottom-30">
          <input 
            className={`form-control input-base ${errors.username && 'is-invalid'}`}
            name="username"
            placeholder="Email"
            ref={register({
              required: "Campo obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "E-mail inválido"
              }
            })}
            type="email" 
          />
          {errors.username && 
            <div className="invalid-feedback d-block">
              {errors.username.message}
            </div>
          }
        </div>
        <div className="margin-bottom-30">
          <input 
            className={`form-control input-base ${errors.password && 'is-invalid'}`}
            name="password"
            placeholder="Senha"
            ref={register({ 
              minLength: 5, 
              required: "Campo obrigatório" 
            })}
            type="password" 
          />
          {errors.password && 
            <div className="invalid-feedback d-block">
              {errors.password.message}
            </div>
          }
        </div>
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