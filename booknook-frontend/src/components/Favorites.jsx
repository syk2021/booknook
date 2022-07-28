import React from 'react';
import styled from 'styled-components';
import useBooks from '../hooks/useBooks';
import useFavorites from '../hooks/useFavorites';
import palette from '../lib/styles/palette';

// const Favorites = () => { } || function Favorites() {}
const Favorites = () => {
    const favorites = useFavorites();
    const { books } = useBooks();
    
    return (
        <FavoriteWrapper>
            {favorites.map((favorite) => {
                const { isbn } = favorite;
                const book = books.find((b) => b.isbn === isbn);

                return (
                    <>
                        <div className='item' key={isbn}>
                            <div className='bookImg'>
                                <img src={book.thumbnail} alt={book.thumbnail}/>
                            </div>
                            <div className='content'>
                                <p className="favCount">{favorite.quantity} favorites</p>
                            </div>
                        </div>
                    </>
                );
            
            })}
        </FavoriteWrapper>
    );
};


const FavoriteWrapper = styled.div`
    display: grid;
    width: 100%;
    min-height: 20rem;
    grid-template-columns: repeat(5, 0.1fr);
    grid-gap: 5px;
    background-color: ${palette.gray[2]};
    align-items: center;
    font-family: 'poppins', serif;

    .bookImg {
        img {
            width: 180px;
            height: 240px;
        }
    }
    .content {
        margin: 1rem;
        font-size: 1.4rem;
        line-height: 10px;
        align-items: center;
        width: 80%;
        .favCount {
            font-size: 80%;
            text-align: center;
        }
    }
    .icon {
        display: flex;
        width: 30px;
        height: 30px;
        margin: 1rem 0;
    }
`;

export default Favorites;
