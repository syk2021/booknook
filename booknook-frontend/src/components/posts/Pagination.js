import styled from 'styled-components';
import qs from 'qs';
import Button from '../common/Button';

const PaginationBlock = styled.div`
    width: 320px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
`;

const PageNumber = styled.div``;

const buildLink = ({ username, page, tag }) => {
    const query = qs.stringify({ page, tag});
    return username ? `/@${username}?${query}` : `/?${query}`;
};

const Pagination = ({ page, lastPage, username, tag }) => {
    return (
        <PaginationBlock>
            <Button disabled={page === 1}
            to={page === 1 ? undefined: buildLink({ username, page: page - 1, tag })}>
                Previous
            </Button>
            <PageNumber>{page}</PageNumber>
            <Button disabled={page === lastPage}
            to={ page === lastPage ? undefined : buildLink({ username, page: page + 1, tag})}>
                Next
            </Button>
        </PaginationBlock>
    );
};

export default Pagination;