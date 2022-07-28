import React, { useMemo } from 'react';
import styled from 'styled-components';
import useOrderActions from '../hooks/useOrderActions';
import useBooks from '../hooks/useBooks';
import useOrders from '../hooks/useOrders';
import { BsCart } from 'react-icons/bs';

const Order = () => {
    const orders = useOrders();
    const { books } = useBooks();
    const { remove } = useOrderActions();

    const totalPrice = useMemo(() => {
        return orders
        .map((order) => {
            const { isbn, quantity } = order;
            const book = books.find((b) => b.isbn === isbn);
            return book.sale_price * quantity;
        })
        .reduce((l, r) => l + r, 0);
    }, [orders, books]);

    // if no orders (orders.length === 0 will fail)
    if (orders.length === 0) {
        return (
            <OrderWrapper>
                <p className="warningmsg">Your cart is empty!</p>
                <p className="warningmsg">Please add a book!</p>
            </OrderWrapper>
        );
    }

    // else, there are orders
    return (
        <>
        <OrderWrapper>
            <h1>Your Cart</h1>
            {orders.map((order) => {
                const { isbn } = order;
                const book = books.find((b) => b.isbn === isbn);
                const removeClick = () => {
                    remove(isbn);
                };
                return (
                    <>
                    <div className='item' key={isbn}>
                        <div className='bookImg'>
                            <img src={book.thumbnail} alt={book.thumbnail}/>
                        </div>
                        <div className='content'>
                            <p className='bookTitle'>
                                {book.title} {order.quantity} books
                            </p>
                            <p className='bookPrice'>
                                &#8361; { book.sale_price * order.quantity}
                            </p>
                        </div>
                        <div className='icon'>
                            <BsCart onClick={removeClick}/>
                        </div>
                    </div>
                </>
                );
            })}
            <hr />
                <div className='totalItem'>
                    <div className='total'>Total</div>
                    <div className='PriceBox'>
                        <div className='bookTotalPrice'> &#8361; {totalPrice}</div>
                    </div>
            </div>
        </OrderWrapper>
        </>
    );
};

const OrderWrapper = styled.div`
    position: relative;
    width: 100%;
    top: 2rem;
    margin-left: 30px;
    h1 {
        text-align: left;
    }
    .item {
        display: flex;
        margin-bottom: 1rem;
    }
    .bookImg {
        img {
          width: 60px;
          height: 80px;
        }
    }
    .content {
        .bookTitle {
            margin-left: 2rem;
            font-weight: 600;
            font-size: 16px;
        }
        .bookPrice {
            margin-left: 2rem;
        }
    }
    .icon {
        margin-left: 2rem;
        margin-top: 1rem;
    }
      .totalItem {
        margin-top: 1rem;
        display: flex;
        //grid-template-columns: repeat(3, 1fr);
        align-items: center;
        .total {
          font-weight: 600;
          font-size: 1.8rem;
          width: 67%;
        }
        .PriceBox {
          display: flex;
          align-items: center;
          text-align: right;
          .bookTotalPrice {
            font-weight: 600;
            font-size: 1.8rem;
            margin-right: 2rem;
          }
        }
      }
      .warningmsg {
        text-align: center;
      }
`;
    
export default Order;