import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from "react";
import * as dishService from './services/dishService';
import { AuthProvider } from './context/AuthContext';
import { DishContext } from './context/DishContext';

//import { useState } from 'react';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Recipes from './components/Recipes/Recipes';
import CreateDish from './components/CreateDish/CreateDish';
import EditDish from './components/EditDish/EditDish';
import PrivateRoute from "./components/common/PrivateRoute";
import DishDetails from "./components/DishDetails/DishDetails";
//import uniqid from 'uniqid';


import './App.css';

const Register = lazy(() => import('./components/Register/Register'));

// main 

function App() {

  const [dishes, setDishes] = useState([]);
  console.log(dishes)
  const navigate = useNavigate();


  const addComment = (dishId, comment) => {
    setDishes(state => {
      const dish = state.find(x => x._id === dishId);

      const comments = dish.comments || [];
      comments.push(comment)
      navigate('/recipes');

      return [
        ...state.filter(x => x._id !== dishId),
        { ...dish, comments },
      ];
    });
  };

  const dishAdd = (dishData) => {
    setDishes(state => [
      state,
      dishData,
    ]);

    navigate('/recipes');
  };

  const dishRemove = (dishId) => {
    setDishes(state => [
      state,
      dishId,
    ]);
  }
  const dishEdit = (dishId, dishData) => {
    setDishes(state => state.map(x => x._id === dishId ? dishData : x));
  }

  useEffect(() => {
    dishService.getAll()
      .then(result => {
        console.log(result);
        setDishes(result);
      });
  }, []);

  return (
    <AuthProvider>
      <div className="App">

        <Header />
        <DishContext.Provider value={{ dishes, dishAdd, dishEdit, dishRemove }}>

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/recipes' element={<Recipes dishes={dishes} />} />
            <Route path="/register" element={
              <Suspense fallback={<span>Loading....</span>}>
                <Register />
              </Suspense>
            } />
            <Route path="/create" element={<CreateDish />} />
            <Route path="/recipes/:dishId/edit" element={<EditDish />} />
            <Route element={<PrivateRoute />}>
              <Route path="/logout" element={<Logout />} />
            </Route>
            <Route path="/recipes/:dishId" element={<DishDetails dishes={dishes} addComment={addComment} dishRemove={dishRemove} />} />

          </Routes>
        </DishContext.Provider>
        <Footer />
      </div>
    </AuthProvider >

  );
}

export default App;
