import Cart from '../components/Cart';
import { Helmet } from 'react-helmet-async';

const CartPage = () => {
    return (
        <>
            <Helmet>
                <title>Cart - BOOKNOOK</title>
            </Helmet>
            <Cart/>
        </>
    );
};

export default CartPage;