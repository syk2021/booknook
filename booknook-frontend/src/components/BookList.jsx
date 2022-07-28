import React from 'react';
import styled from 'styled-components';
import useBooks from '../hooks/useBooks';
import { FaRegHeart, FaCartPlus } from 'react-icons/fa';
import useFavorites from '../hooks/useFavoriteActions';
import useOrderActions from '../hooks/useOrderActions';

const BookList = () => {
  const { books } = useBooks();
  const { addToFavorites } = useFavorites();
  const { addToOrder } = useOrderActions();

  return (
    <BookListWrapper>
      {books.map((book) => {
        const { isbn, thumbnail, title, price, sale_price, authors, url } =
          book;

        const clickFavorites = () => {
            addToFavorites(isbn);
        };

        const clickOrders = () => {
            addToOrder(isbn);
        };
        
        return (
            <BookItem key={isbn}>
            <div className='item' key={isbn}>
                <div className='bookImg'>
                    <a href={url} target='_blank' rel='noreferrer'>
                        <img src={thumbnail} alt={thumbnail}/>
                    </a>
                </div>
                <div className='content'>
                    <div className='bookTitle'>{title}</div>
                    <div className='bookAuthors'>{authors}</div>
                    <div className='bookPrice'>
                        &#8361; {sale_price.toLocaleString()}
                        <strike className='oldPrice'>{price.toLocaleString()}</strike>
                    </div>
                    <FaRegHeart className='heart' style={{color: 'red'}} onClick={clickFavorites}/>
                    <FaCartPlus className='cart' onClick={clickOrders}/>
                </div>
            </div>
            </BookItem>
        );
      })}
    </BookListWrapper>
  );
};

const BookListWrapper = styled.li`
  display: grid;
  width: 90rem;
  min-height: 40rem;
  margin: auto;
`;

const BookItem = styled.dl`
  position: relative;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  .item {
      display: flex;
      margin-bottom: 1rem;
  }
  .bookImg {
    img {
      width: 120px;
      height: 160px;
    }
  }
  .content {
    .bookTitle {
        margin-left: 2rem;
        font-weight: 600;
        font-size: 20px;
    }
    .bookAuthors {
        margin-left: 2rem;
    }
    .bookPrice {
        margin-left: 2rem;
        .oldPrice {
            margin-left: 0.4rem;
        }
    }
  }
  .heart {
      margin-left: 2rem;
  }
  .cart {
      margin-left: 2rem;
  }

  &:hover {
    .bookImg {
      img {
        opacity: 0.5;
      }
    }
    }
  }
`;

export default BookList;