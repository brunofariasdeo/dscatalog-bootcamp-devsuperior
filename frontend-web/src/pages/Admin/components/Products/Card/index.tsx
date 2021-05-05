import ProductPrice from "core/components/ProductPrice";
import { Product } from "core/types/Product";
import React from "react";
import "./styles.scss";

type Props = {
  product: Product;
};

const Card = ({ product }: Props) => {
  return (
    <div className="card-base product-card-admin">
      <div className="row">
        <div className="col-2 text-center border-right py-3">
          <img
            className="product-card-image-admin"
            src={product.imgUrl}
            alt={product.name}
          />
        </div>
        <div className="col-7 py-3">
          <h3 className="product-card-name-admin">{product.name}</h3>
          <ProductPrice price={product.price} />
          <div>
            {product.categories.map((category) => (
              <span className="badge badge-pill badge-secondary mr-2">
                {category}
              </span>
            ))}
          </div>
        </div>
        <div className="col-3 pt-3 pr-5">
          <button
            className="btn btn-outline-secondary btn-block border-radius-10 mb-3 btn-edit"
            type="button"
          >
            Editar
          </button>
          <button
            className="btn btn-outline-danger btn-block border-radius-10 mb-3"
            type="button"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
