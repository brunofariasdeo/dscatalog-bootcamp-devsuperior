import { makePrivateRequest } from 'core/utils/request';
import React, { useState } from 'react';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
  category: string;
  description: string;
  name: string;
  price: string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const Form = () => {
  const [formData, setFormData] = useState<FormState>({
    category: '',
    description: '',
    name: '',
    price: ''
  });

  const handleOnChange = (event: FormEvent) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({...data, [name]: value}));
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      ...formData,
      imgUrl: 'https://s2.glbimg.com/Q6BitDHXemYGisPxL6khf_uQAxY=/0x0:1080x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2020/P/3/BLYaRHTmS6hyJHUD2zFw/1.jpg',
      categories: [{id:formData.category}]
    }

    makePrivateRequest({ url:'/products', method: 'POST', data: payload })
      .then(() => {
        setFormData({ category: '', description: '', name: '', price: '' })
      });
  }

  return (
    <form onSubmit = {handleSubmit}>
      <BaseForm title="Cadastrar produto">
        <div className="row">
          <div className="col-6">
            <input 
              className="form-control mb-5"
              name="name"
              onChange={handleOnChange}
              placeholder="Nome do produto"
              type="text" 
              value={formData.name}
            />
            <select  
              className="form-control mb-5"
              name="category" 
              onChange={handleOnChange}
              value={formData.category}
            >
              <option value="1">Livros</option>
              <option value="3">Computadores</option>
              <option value="2">Eletronicos</option>
            </select>
            <input 
              className="form-control"
              name="price"
              onChange={handleOnChange}
              placeholder="Preço"
              type="text" 
              value={formData.price}
            />
          </div>
          <div className="col-6">
            <textarea  
              className="form-control"
              cols={30}
              name="description" 
              onChange={handleOnChange}
              rows={10}
              value={formData.description}
            >

            </textarea>
          </div>
        </div>
      </BaseForm>
    </form>
  )
}

export default Form;