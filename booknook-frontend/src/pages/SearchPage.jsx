import React from 'react';
import BookList from '../components/BookList';
import SearchBar from '../components/SearchBar';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';

const SearchPage = () => {
    return (
        <SectionWrapper>
            <Helmet>
                <title>Search - BOOKNOOK</title>
            </Helmet>
            <h1>Search Results</h1>
            <SearchBar/>
            <BookList/>
        </SectionWrapper>
    );
};

const SectionWrapper = styled.div`
    margin-left: 1.9rem;
`;

export default SearchPage;