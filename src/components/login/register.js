/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Register = () => {
  const InputStyle = {
    with: '500px',
    height: '30px',
    borderRadius: '50px',
    textAlign: 'center',
    border: '1px solid #2b2b2b',
    outline: 'none',
    fontSize: '16px',
    margin: '3px'

  }
  const mainContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '200px'
  }
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1px'
  }
  const Btn = {
    marginTop: '10px',
    width: '200px',
    borderRadius: '20px',
  }

  const listBtn = {
    marginTop: '10px',
    marginBottom: '20px',
    width: '150px',
    padding: '10px'
  }
  const [users, setUsers] = useState([]); //to print List on React Page
  // const [isRegistered, setIsRegistered] = useState(false);
  const [form, setForm] = useState({});

  const handleForm = (e) => {
    // console.log(e.target.value,e.target.name); debugging only
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e, res) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        console.log('Registration Successful');
        window.location.href = '/login';
      } else if (response.status === 400) {
        console.log('Email or contact already exists');
        alert('Email or contact already exists. Please use a different email or contact.');
      } else {
        console.log('Registration failed');
        // Handle registration failure, display an error message, etc.
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };


  const getUsers = async () => {
    const response = await fetch('http://localhost:5000/register', {
      method: 'GET',
    })
    const data = await response.json();
    setUsers(data);
  }

  useEffect(() => {
    getUsers();
  }, [])

  const [isListVisible, setListVisible] = useState(false);

  const displayList = () => {
    setListVisible(!isListVisible);
  };

  return (
    <>
      <div className="mainContainer" style={mainContainerStyle}>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          {/* <p>{JSON.stringify(form)}</p> for debugging only */}
          <div className="container__1" style={containerStyle}>
            <input type="text" placeholder="Name" style={InputStyle} name="username" onChange={handleForm} required />
            <input type="email" placeholder="Email" style={InputStyle} name="email" onChange={handleForm} required />
            <input type="number" placeholder="Contact" style={InputStyle} name="contact" onChange={handleForm} required />
            <input type="password" placeholder="Password" style={InputStyle} name="password" onChange={handleForm} required />
            <button type="submit" style={Btn}>Login</button>
          </div> <br />
          <p>Don't Have an Account? <Link to='/login'>LogIn</Link></p>
        </form>
        <button className='displayUser__List' onClick={displayList} style={listBtn}>
          {isListVisible ? 'Hide User List' : 'Show User List'}
        </button>
        {isListVisible && (
          <div className="usersList">
            <ul>
              {users.map((NewUser) => (
                <p key={NewUser._id}><hr /> <br />
                  {NewUser.name} <br />
                  {NewUser.email}<br />
                  {NewUser.contact}<br />
                  {NewUser.password}<br />
                  {NewUser.userid}<br />
                  <br />
                </p>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default Register