import { useContext } from 'react';
import AppStateContext from '../contexts/AppStateContext';

export default function useFavorites() {
    const { favorites } = useContext(AppStateContext);
    return favorites;
}