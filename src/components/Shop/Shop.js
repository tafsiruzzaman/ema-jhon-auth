import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import {addToDb, getStoredCart} from '../../utilities/fakedb';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);
    useEffect( () => {
        fetch('./products.JSON')
        .then(res => res.json())
        .then(data => {
            setProducts(data);
            setDisplayProducts(data);
        })
    }, []);
    useEffect( () => {
        if(products.length) {
            const savedCart = getStoredCart();
            const storedCart = [];
            for (const key in savedCart) {
            const addedProduct = products.find(product => product.key === key);
            if (addedProduct){
                const quantity = savedCart[key];
                addedProduct.quantity= quantity;
                storedCart.push(addedProduct);
            }
            };
            setCart(storedCart)
        }
    }, [products])
    
    const handleAddToCart = (product) => {
        const newCart = [...cart];
        let exist = false;
        for (const prod of newCart) {
            if(prod.key === product.key) {
                prod.quantity = prod.quantity + 1;
                exist = true;
            };
        }
        if (exist === false) {
            newCart.push(product)
        };
        
        setCart(newCart);
        addToDb(product.key);
    }

    const handleSearch = event => {
        const searchText = event.target.value;
        const matchedProduct = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        setDisplayProducts(matchedProduct);
    }
    return (
        <div>
            <div className="input-container">
                <input className="search-input" type="text" onChange={handleSearch} placeholder="search products" />
            </div>
            <div className="shop-container">
                <div className="product-container">
                    {
                        displayProducts.map(product => <Product key={product.key} product={product} handleAddToCart={handleAddToCart}></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <Link to="/review">
                            <button className="btn-regular">Review your order</button>
                        </Link>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;