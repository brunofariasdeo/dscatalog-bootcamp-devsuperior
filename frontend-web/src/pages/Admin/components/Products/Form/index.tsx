import { makePrivateRequest } from "core/utils/request";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import BaseForm from "../../BaseForm";
import "./styles.scss";

type FormState = {
  description: string;
  name: string;
  price: string;
  imageUrl: string;
};

const Form = () => {
  const { errors, handleSubmit, register } = useForm<FormState>();

  const onSubmit = (data: FormState) => {
    makePrivateRequest({
      url: "/products",
      method: "POST",
      data,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseForm title="Cadastrar produto">
        <div className="row">
          <div className="col-6">
            <div className="margin-bottom-30">
              <input
                className="form-control input-base"
                name="name"
                placeholder="Nome do produto"
                ref={register({
                  minLength: {
                    message: "O campo deve ter no mínimo 5 caracteres",
                    value: 5,
                  },
                  maxLength: {
                    message: "O campo deve ter no máximo 60 caracteres",
                    value: 60,
                  },
                  required: "Campo obrigatório",
                })}
                type="text"
              />
              {errors.name && (
                <div className="invalid-feedback d-block">
                  {errors.name.message}
                </div>
              )}
            </div>
            <div className="margin-bottom-30">
              <input
                className="form-control input-base"
                name="price"
                placeholder="Preço"
                ref={register({
                  required: "Campo obrigatório",
                })}
                type="number"
              />
              {errors.price && (
                <div className="invalid-feedback d-block">
                  {errors.price.message}
                </div>
              )}
            </div>
            <div className="margin-bottom-30">
              <input
                className="form-control input-base"
                name="imageUrl"
                placeholder="Imagem do produto"
                ref={register({
                  required: "Campo obrigatório",
                })}
                type="text"
              />
              {errors.imageUrl && (
                <div className="invalid-feedback d-block">
                  {errors.imageUrl.message}
                </div>
              )}
            </div>
          </div>
          <div className="col-6">
            <textarea
              className="form-control input-base"
              cols={30}
              name="description"
              placeholder="Descrição"
              ref={register({
                required: "Campo obrigatório",
              })}
              rows={10}
            />
            {errors.description && (
              <div className="invalid-feedback d-block">
                {errors.description.message}
              </div>
            )}
          </div>
        </div>
      </BaseForm>
    </form>
  );
};

export default Form;
