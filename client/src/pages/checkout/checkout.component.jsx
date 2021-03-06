import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './checkout.styles.scss';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

const CheckoutPage = ({ cartItems, total }) => (
    <div className="checkout-page">
        <div className="checkout-header">
            <div className="header-block">
                <span>Product</span>
            </div>
            <div className="header-block">
                <span>Description</span>
            </div>
            <div className="header-block">
                <span>Quantity</span>
            </div>
            <div className="header-block">
                <span>Price</span>
            </div>
            <div className="header-block">
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem => <CheckoutItem cartItem={cartItem} key={cartItem.id} />)
        }
        <div className="total">
            <span>Total: ${total}</span>
        </div>
        <div className='test-warning'>
            *Please use the following to test 
             credit card for payments
            <p>card number: 4242 4242 4242 4242</p>
            <p>Exp: 01/20 </p>
            <p>CVV: 123</p>
        </div>
        <StripeCheckoutButton price={total} />
        
       
    </div>
);
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});
export default connect(mapStateToProps)(CheckoutPage);