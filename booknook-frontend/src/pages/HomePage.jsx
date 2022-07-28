import React from 'react';
import Favorites from '../components/Favorites';
import SearchBar from '../components/SearchBar';
import styled from 'styled-components';
// no helmet set for home page

const Home = () => {
    return (
        <>
        <SectionWrapper>
            <SearchBar/>
        </SectionWrapper>
        <SectionWrapper>
            <h2>Reader Favorites</h2>
            <div>
                <Favorites />
            </div>
        </SectionWrapper>
        </>
    );
};

const SectionWrapper = styled.div`
    margin-left: 1.9rem;
    margin-right: 1.9rem;
`;

export default Home;