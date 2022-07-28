import { useContext } from 'react';
import AppStateContext from '../contexts/AppStateContext';

// gets books data and returns it
export default function useBooks() {
    const {books, searchBook } = useContext(AppStateContext);
    return { books, searchBook };
}