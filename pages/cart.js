import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";

import Layout from '../components/layout';
import Header from '../components/header';
import Headerr from "components/Header/Header.js";
import * as cartActions from "../store/actions/cart";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

import CurrencyFormat from 'react-currency-format';
import HeaderLinks from "components/Header/HeaderLinks.js";
import firebase from '../components/config/firebase';
import { Description } from '@material-ui/icons';
import styles from "assets/jss/nextjs-material-kit/pages/components.js";

const useStyles = makeStyles(styles);

const userId = firebase.auth().currentUser.uid

const CartItem = ({ id, name, price, quantity, sum, image, totalAmount }) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.availableProducts);

    return (
        <div>
            <h4>{name}</h4>
            <img src={image} width="375" height="275" />
            <p>Price : <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></p>
            <p>Quantity: {quantity}</p>
            <p>SubTotal: <CurrencyFormat value={sum} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></p>
            <button onClick={() => { dispatch(cartActions.addToCart(product[id - 1])) }}>&nbsp;&nbsp;+&nbsp;&nbsp;</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={() => { dispatch(cartActions.removeFromCart(id)) }}>&nbsp;&nbsp;-&nbsp;&nbsp;</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={() => { dispatch(cartActions.addToOrder(product[id - 1])) 
                firebase.database().ref('Order/' + userId).push({
                    productName: name,
                    productPrice: price,
                    quantity: quantity,
                    harga: sum,

                });
            }}>Order</button>
            
        </div>
    )
}

const Cart = (props) => {
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productName: state.cart.items[key].productName,
                productImage: state.cart.items[key].productImage,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return transformedCartItems;
    });

    const totalAmount = useSelector(state => state.cart.totalAmount);
    const classes = useStyles();
    const { ...rest } = props;

    return (
        <div>
        <Headerr
            brand="TaniBisnisShop"
            rightLinks={<HeaderLinks />}
            fixed
            color="transparent"
            changeColorOnScroll={{
                height: 400,
                color: "white"
            }}
            {...rest}
        />
        <Parallax small filter image={require("assets/img/sayur.jpg")}>
            <div className={classes.container}>
            <GridContainer>
                <GridItem>
                <div className={classes.brand}>
                    <h1 className={classes.title}>Welcome to TaniBisnisShop</h1>
                    <h3 className={classes.subtitle}>
                    TaniBisnisShop is a research project in the last semester of computer science to me and my partner.
                    </h3>
                </div>
                </GridItem>
            </GridContainer>
            </div>
        </Parallax>
        <Layout>
            {
                totalAmount === 0
                    ? <h2>Your Cart is Empty</h2>
                    : cartItems.map(item => 
                        <CartItem
                            key={item.productId}
                            id={item.productId}
                            name={item.productName}
                            price={item.productPrice}
                            quantity={item.quantity}
                            sum={item.sum}
                            image={item.productImage}
                        />
                    )
            }
            {
                totalAmount !== 0 &&
                <h2>Grand Total: <CurrencyFormat value={totalAmount} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /> </h2>
            }
        </Layout>
        <Footer />
        </div>
    )

}

export default Cart;