import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthProvider } from '../../components/auth/AuthContext'; // Make sure to provide the correct path to your AuthContext.


const Dashboard = () => {
  const { isAuthenticated } = useContext(AuthProvider);
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const handleForm = (e) => {
    // console.log(e.target.value,e.target.name); debugging only
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(form);
  }
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }
  return (
    <>
      <div className="mainContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" id="name" placeholder="Name" onChange={handleForm} />
          <input type="number" name='price' placeholder='enter amount'  onChange={handleForm}/>
          <textarea name="description" id="" cols="30" rows="10" onChange={handleForm}></textarea>
        <div id="image" >
        <input type="file" name="image"  onChange={handleForm}/>
        </div>
          <input type="text" name="category" id="category" placeholder="Category"  onChange={handleForm}/>
          <input type="text" name='transferred' placeholder='transferred to' onChange={handleForm} />
          <button type="submit">Submit</button>
        </form>
        <hr />
      </div>
      <div className="containerdashboard">
        <img src="https://dummyimage.com/400x400/000/fff" alt="" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet hic aspernatur et odio sed voluptatum maiores,
          perferendis iste maxime quae laborum! Quisquam nemo culpa numquam delectus officia et repellat, illo autem facere
          odio nulla tenetur ut eum quo ab fugiat veritatis, distinctio laboriosam exercitationem nam sunt. Aut consequuntur nulla ut!
        </p>

        <h1>Most Expensive month :</h1>
        <img src="https://dummyimage.com/100x100/000/fff" alt="" />
        <h1>least Expesnive Month :</h1>
        <img src="https://dummyimage.com/100x100/000/fff" alt="" />
        <div className="bottomPadding"></div>
      </div>
    </>
  );
};

export default Dashboard;
