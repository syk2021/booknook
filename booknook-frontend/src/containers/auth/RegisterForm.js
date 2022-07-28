

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const onChange = (event) => {
    const { name, value } = event.target;
    dispatch(changeField({ form: 'register', key: name, value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const { username, password, passwordConfirm } = form;

    if ([username, password, passwordConfirm].includes('')) {
      setError('Please enter all fields.');
      return;
    }

    if (password !== passwordConfirm) {
      setError('Passwords do not match.');
      return;
    }
    dispatch(register({ username, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError('Username already exists.');
        return;
      }
      setError('Registration failed.');
      setError(authError.response.status);
      return;
    }

    if (auth) {
      console.log('Registration successful.');
      console.log(auth);
      dispatch(check());
    }
  }, [authError, auth, dispatch]);

  const navigate = useNavigate();
  useEffect(() => {
      if (user) {
         navigate('/');
         try {
           localStorage.setItem('user', JSON.stringify(user));
         } catch (e) {
           console.log('localStorage is not working');
         }
      }
  }, [user, navigate]);

  return <AuthForm type="register" form={form} onChange={onChange} onSubmit={onSubmit} error={error} />;
}

export default RegisterForm;