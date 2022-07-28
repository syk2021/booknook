import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useBooks from '../hooks/useBooks';
import palette from '../lib/styles/palette'
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const { searchBook } = useBooks();
    const [text, setText] = useState('');
    const [searched, setSearched] = useState('');
    const navigate = useNavigate();

    const onEnter = (e) => {
        if (e.keyCode === 13) {
            searchBook(text);
            setSearched(true);
        }
    };

   
    const onTextUpdate = (e) => {
        setText(e.target.value);
    };

    // // useEffect that redirects to search page when ENTER is pressed
    useEffect(() => {
        if (searched) {
            setSearched(false);
            return navigate("/search");
        }
    },[navigate, searched, setSearched])


    return (
        <SearchBarWrapper>
            <div className='searchBar'>
                <StyledInput
                type='search'
                placeholder='Search for a book!'
                name='query'
                onKeyDown={onEnter} // enter
                onChange={onTextUpdate} // change 
                value = {text}
                className='input_search'
                />
            </div>
        </SearchBarWrapper>
    );
};


const StyledInput = styled.input`
font-size: 1rem;
border: none;
border-bottom: 1px solid ${palette.gray[5]};
padding-bottom: 0.5rem;
outline: none;
width: 100%;
& + & {
    margin-top: 1rem;
}
`;

// width: 20rem;
// margin: 3rem auto;
// border-radius: 4px;
const SearchBarWrapper = styled.div`
overflow: hidden;
.title {
    font-family: 'Poppins', sans-serif;
    display:flex;
    align-items: left;
    justify-content: left;
    font-size: 5rem;
}
.books {
    display: flex;
}
.searchBar {
    .input_search {
        width: 100%;
        height: 3rem;
        font-size: 20px;
    }
    position: right;
    height: 0.1 rem;
    padding: 10 10rem;
    margin: 1rem auto;
    text-align: left;
    box-sizing: content-box;
    justify-content: center;
}
`;

export default SearchBar;

