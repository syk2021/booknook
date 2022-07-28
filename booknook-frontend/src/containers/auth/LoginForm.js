import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector( ({ auth, user }) => ( {
        form : auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));
   
    const onChange = e => {
        const { value, name } = e.target;
        // 액션 생성 함수 import
        dispatch(
            changeField({
                form:'login',
                key:name,
                value
            })
        );
    };
    // form submit event
    const onSubmit = e => {
        e.preventDefault();
        const { username, password } = form;
        dispatch(login({ username, password}));
    };
    
    useEffect(()=>{
        dispatch(initializeForm('login'));
    },[dispatch]);

    useEffect(() => {
        if (authError) {
            console.log('An error occured');
            console.log(authError);
            setError('Login failed');
            return;
        }
        if (auth) {
            console.log('Login successful!');
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate('/');
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch(e) {
                console.log('localStorage is not working');
            }
        }
    }, [navigate, user]);

    return (
        
       <AuthForm
       type="login"
       form={form}
       onChange={onChange}
       onSubmit={onSubmit}
       error={error} 
       />
    );
};

export default LoginForm;