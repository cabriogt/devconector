import React,{useEffect}from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import NotFound from './components/layout/NotFound';
import Register from './components/layout/auth/Register';
import Login from './components/layout/auth/Login';
import Dashboard from './components/dashbord/Dashbord';
import Profile from './components/profile/Profile';
import Post from './components/post/Post';
import Posts from './components/posts/Posts';
import Profiles from './components/profiles/Profiles';
import CreateProfile from './components/profile-from/CreateProfile'; 
import EditProfile from './components/profile-from/EditProfile'; 
import AddExperience from './components/profile-from/AddExperience'; 
import AddEducation from './components/profile-from/AddEducation'; 
import PrivateRoute from './components/layout/routing/PrivateRoute';
import Alert from './components/layout/Alert';
import {loadUser}from './actions/auth';
import {LOGOUT}from './actions/types';
import setAuthToken from './utils/setAuthToken';

//Redux Lib
import {Provider} from 'react-redux';
import store from './store';


const App =()=>{

  useEffect(()=>{

    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });

    
  },[])





  return(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar/>
          <Alert/>
            <Routes>
                <Route 
                  path="/" 
                  element={<Landing/>}
                />
                <Route 
                  path="/register" 
                  element={<Register/>}
                />
                <Route 
                  path="/login" 
                  element={<Login/>}
                />
                <Route 
                  path="/profiles"  
                  element={<PrivateRoute component={Profiles} />}
                />
                <Route 
                  path="/profile/:id"  
                  element={<PrivateRoute component={Profile} />}
                />
                <Route 
                  path="/dashboard"  
                  element={<PrivateRoute component={Dashboard} />}
                />
                <Route 
                  path="/create-profile"  
                  element={<PrivateRoute component={CreateProfile} />}
                />
                <Route 
                  path="/edit-profile"  
                  element={<PrivateRoute component={EditProfile} />}
                />
                <Route 
                  path="/add-experience"  
                  element={<PrivateRoute component={AddExperience} />}
                />
                <Route 
                  path="/add-education"  
                  element={<PrivateRoute component={AddEducation} />}
                />
                <Route 
                  path="/posts" 
                  element={<PrivateRoute component={Posts} />}
                />
                <Route 
                  path="/posts/:id" 
                  element={<PrivateRoute component={Post} />}
                />
                <Route
                  path="*" 
                  element={<NotFound/>}
                />
            </Routes>
        </BrowserRouter>
      </Provider>
  )
}

export default App;
