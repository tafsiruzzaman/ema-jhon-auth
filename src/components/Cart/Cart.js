import React from 'react';

const Cart = (props) => {
    const {cart} = props;
    let totalQuantity = 0;
    let total = 0;
    for (const product of cart) {
        if(!product.quantity) {
            product.quantity = 1;
        }
        total = total + product.price * product.quantity;
        totalQuantity = totalQuantity + product.quantity;
    };
    const shipping = total > 100 ? 15 : 0;
    const tax = (total + shipping) * .10;
    const grandTotal = total + shipping + tax;
    return (
        <div>
            <h3>Order Summary</h3>
            <h4>Items ordered: {totalQuantity} </h4>
            <h4>Total: {total.toFixed(2)}</h4>
            <p>Shipping: {shipping}</p>
            <p>Tax: {tax.toFixed(2)}</p>
            <p>Grand Total: {grandTotal.toFixed(2)}</p>
        </div>
    );
};

export default Cart;