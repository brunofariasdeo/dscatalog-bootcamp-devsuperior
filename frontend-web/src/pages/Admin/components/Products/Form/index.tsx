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
  const { handleSubmit, register } = useForm<FormState>();

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
            <input
              className="form-control margin-bottom-30 input-base"
              name="name"
              placeholder="Nome do produto"
              ref={register({
                required: "Campo obrigatório",
              })}
              type="text"
            />
            <input
              className="form-control margin-bottom-30 input-base"
              name="price"
              placeholder="Preço"
              ref={register({
                required: "Campo obrigatório",
              })}
              type="number"
            />
            <input
              className="form-control margin-bottom-30 input-base"
              name="imageUrl"
              placeholder="Imagem do produto"
              ref={register({
                required: "Campo obrigatório",
              })}
              type="text"
            />
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
            ></textarea>
          </div>
        </div>
      </BaseForm>
    </form>
  );
};

export default Form;
