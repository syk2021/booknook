import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Button from './components/common/Button';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './modules/user';

const UserInfo = styled.div`
    font-weight: 800;
    margin-right: 1rem;
`;

const Navbar = () => {
    const { user } = useSelector(({user}) => ({user: user.user}));
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout());
    };
    return (
        <NavbarWrapper>
            <div>
                <NavLink to="/" className="navbar-title">
                    BOOKNOOK
                </NavLink>
                <NavLink to="/" className="navbar-link">Home</NavLink>
                <NavLink to="/search" className="navbar-link">Search</NavLink>
                <NavLink to="/cart" className="navbar-link">Cart</NavLink>
                <NavLink to="/register" className="navbar-link">Register</NavLink>
                <NavLink to="/write" className="navbar-link">Write</NavLink>
                {user ? (
                    <div className="right">
                        <UserInfo>{user.username}</UserInfo>
                        <Button onClick={onLogout}>Logout</Button>
                    </div>) : (
                        <div className="right">
                            <Button to="/login">Login</Button>
                        </div>
                    )}
            </div>
        </NavbarWrapper>

        // EDIT: navbar can be made through this way, but does not remember data if navigate with pages through navbar
        // <NavbarWrapper>
        //     <nav className="navbar" class="navbar navbar-expand navbar-expand-lg navbar-light bg-light me-auto">
        //         <ul class="navbar-nav list-unstyled" className="navbar-list">
        //             <li class="nav-item">
        //                 <a class="nav-link" href="/" className="navbar-link">
        //                     Home
        //                 </a>
        //                 <a class="nav-link" href="/search" className="navbar-link">
        //                     Search
        //                 </a>
        //                 <a class="nav-link" href="/register" className="navbar-link">
        //                     Register
        //                 </a>
        //                 <a class="nav-link" href="/login" className="navbar-link">
        //                     Login
        //                 </a>
        //                 <a class="nav-link" href="/orders" className="navbar-link">
        //                     Orders
        //                 </a>
        //             </li>
        //         </ul>
        //     </nav>
        // </NavbarWrapper>
            
    );
}

const NavbarWrapper = styled.div`
    margin-top: 1rem;
    .navbar-link {
        display: inline-flex;
        text-decoration: none;
        padding-left: 30px;
        color: #5A16F4;
        :visited {
            text-decoration: none;
            color: #5A16F4;
        }

    }
    .right {
        display: inline-flex;
        float: right;
        padding-right: 30px;
    }
    .navbar-title {
        :visited {
            text-decoration: none;
            color: black;
        }
        padding-left: 30px;
        display: inline-flex;
        text-decoration: none;
        font-weight: 600;
        font-size: 35px;
    }

`;

export default Navbar;

