import { useContext } from 'react';
import AppStateContext from '../contexts/AppStateContext';

export default function useActions() {
    const { addToFavorites } = useContext(AppStateContext);
    return { addToFavorites };
}