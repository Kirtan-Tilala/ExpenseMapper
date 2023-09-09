import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import "../login/login.css"

const cookies = require('js-cookie');


const Login = () => {
   


  const [form, setForm] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Login Successful');
        const session = await response.json(); // Assuming the response includes session data
        cookies.set('session', session.sessionId, { expires: 7 }); // Set the cookie
        setIsLoggedIn(true);
        Navigate('/dashboard')
      } else {
        console.log('Login failed');
        // Handle login failure, display an error message, etc.
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // ...






  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace={true} />;
  }




  return (
    <>
      <img src="../../assets/img/loginheader.svg" alt="" />
      <div className="mainContainer" >
        <div class="container__">
          <div class="screen">
            <div class="screen__content">
              <form class="login" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div class="login__field">
                  <i class="login__icon fas fa-user"></i>
                  <input type="email" class="login__input" placeholder="Email" onChange={handleForm} required name='email' />
                </div>
                <div class="login__field">
                  <i class="login__icon fas fa-lock"></i>
                  <input type="password" class="login__input" require placeholder="Password" onChange={handleForm} required name='password' />
                </div>
                <button class="button login__submit" type='submit' id='submit'><span class="button__text">Log In Now</span>
                <img src="https://fontawesome.com/icons/greater-than?f=classic&s=solid&an=flip" alt="" /></button>
              </form>
            </div>
            <div class="screen__background">
              <span class="screen__background__shape screen__background__shape4"></span>
              <span class="screen__background__shape screen__background__shape3"></span>
              <span class="screen__background__shape screen__background__shape2"></span>
              <span class="screen__background__shape screen__background__shape1"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
