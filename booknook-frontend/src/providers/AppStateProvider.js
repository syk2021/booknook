import React, { useCallback, useEffect, useState } from 'react';
// bookSearch function from components/api
import { bookSearch } from '../components/api';
import AppStateContext from '../contexts/AppStateContext';

const AppStateProvider = ({ children }) => {
    // set books
    const [books, setBooks] = useState([]);
    // set query: if useState(0) won't work
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (query.length > 0) {
            bookSearchHttpHandler(query);
        }
    }, [query]);

    const bookSearchHttpHandler = async(query, books) => {
        const params = {
            query: query,
            sort: 'accuracy',
            page: 1,
            size: 10,
        };
        
        // bookSearch from api.js
        const { data } = await bookSearch(params);
        if (!books) {
            setBooks(data.documents);
        } else {
            setBooks(books.concat(data.documents));
        }
    };

    const searchBook = (text) => {
        setQuery(text);
    };

    const [favorites, setFavorites] = useState([]);

    // add to favorites
    const addToFavorites = useCallback((isbn) => {
        setFavorites((favorites) => {
            const found = favorites.find((favorite) => favorite.isbn === isbn);
    
            // if there is no such book in cart
            if (found === undefined) {
                return [...favorites, { isbn, quantity: 1 }];
            }
            // if there is such a book
            else {
                return favorites.map((favorite) => {
                    if (favorite.isbn === isbn) {
                        return {
                            isbn,
                            quantity: favorite.quantity + 1,
                        };
                    } else {
                        return favorite;
                    }
            })}
        });
    }, []);

    const [orders, setOrders ] = useState([]);

    // add to orders
    const addToOrder = useCallback((isbn) => {
        setOrders((orders) => {
            const found = orders.find((order) => order.isbn === isbn);
            if (found === undefined) {
                return [...orders, { isbn, quantity: 1}];
            }
            else {
                return orders.map((order) => {
                    if (order.isbn === isbn) {
                        return {
                            isbn,
                            quantity: order.quantity + 1,
                        };
                    } else {
                        return order;
                    }
                });
            }
        });
    }, []);

    const remove = useCallback((isbn) => {
        setOrders((orders) => {
            return orders.filter((order) => order.isbn !== isbn);
        });
    }, []);

    return (
        <AppStateContext.Provider
        value={{
            books,
            searchBook,
            favorites,
            addToFavorites,
            orders,
            addToOrder,
            remove
        }}>
            {children}
        </AppStateContext.Provider>
    );

};

export default AppStateProvider;