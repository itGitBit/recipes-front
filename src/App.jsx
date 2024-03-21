import './App.css';
// import IngredientsSearch from './Components/Ingredients/IngredientsSearch';
import RecipeList from './Components/Recipe/RecipeList/RecipeList';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import MainHeader from './Components/MainHeader/MainHeader';
import LoginPage from './Components/LoginPage/LoginPage';
import IngredientsSearch from './Components/Ingredients/IngredintsSearch/IngredientsSearch';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout, setToken } from './store/user-slice';
import UserInfo from './Components/User/UserInfo/UserInfo';


function App() {


  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    token ? dispatch(setToken(token)) : dispatch(logout());
  }, [dispatch]);

  return (
    <div className="App">
      <ToastContainer />
      <MainHeader />

      <Routes>
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/ingredients" element={<IngredientsSearch />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<UserInfo />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
