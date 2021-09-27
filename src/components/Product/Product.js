import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import Rating from 'react-rating';

const Product = (props) => {
    const { name, img, seller, price, stock, star } = props.product;
    const cartIcon = <FontAwesomeIcon icon={faShoppingCart} />
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-details">
                <h4 className="product-name">{name}</h4>
                <p><small>by: {seller}</small></p>
                <p>Price: {price} </p>
                <p><small>only {stock} left in stock - order soon</small></p>
                <Rating className="star" emptySymbol="far fa-star" fullSymbol="fas fa-star" initialRating={star} readonly></Rating> <br />
                <button className="btn-regular" onClick={() => props.handleAddToCart(props.product)}>{cartIcon} Add to cart</button>
            </div>
        </div>
    );
};

export default Product;