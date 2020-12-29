import React,{Fragment,useEffect} from 'react';
// import './styles/App.css'
import { Route, Switch} from 'react-router-dom'
import Header from './components/nav/Header';
// import NavBar from './layouts/NavBar'
// import Landing from './layouts/Landing'
// import {Provider} from 'react-redux'
// import store from '../store/store'
// import Alert from './layouts/Alert';
// import setAuthToken from '../utils/setAuthToken';//required to set token in glogal header when loading authenticated user
// import {loadUser} from '../store/actions/authAction';//required to load authenticated user
// import Dashboard from './dashboard/Dashboard'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'

import Home from './pages/Home'
import Product from './pages/Product'

import History from './pages/users/History'
import Password from './pages/users/Password'
import WishList from './pages/users/WishList'

import AdminDashboard from './pages/admin/Dashboard'
import AdminCategoryCreate from './pages/admin/Category/CategoryCreate'
import AdminCategoryUpdate from './pages/admin/Category/CategoryUpdate'

import AdminSubCategoryCreate from './pages/admin/Sub/Create'
import AdminSubCategoryUpdate from './pages/admin/Sub/Update'

import AdminProductCreate from './pages/admin/product/Create'
import AdminProductList from './pages/admin/product/ListProducts'
import AdminProductUpdate from './pages/admin/product/Update'

import UserRoute from './components/routes/UserRoute'
import AdminRoute from './components/routes/AdminRoute';


// import CreateProfile from './profile-form/CreateProfile';
// import EditProfile from './profile-form/EditProfile';
// import AddExperience from './profile-form/AddExperience';
// import AddEducation from './profile-form/AddEducation';
// import UploadProductPage from './UploadProductPage/UploadProductPage';
// import LandingPage from './Products/LandingPage';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Password from 'antd/lib/input/Password';

// import Posts from './post/Posts';
// import Post from './post/Post';

  //check and set global header

//   if(localStorage.token){//check the localstorage  for "token"
//   setAuthToken(localStorage.token)//set the header with the token if there is one

// }

const App = () => {


  return (
      <>
            <Header/>
            <Switch>
                <Route exact path="/"   component={Home}/>
                    <Route exact path="/login"   component={Login}/>
                    <Route exact path="/register"   component={Register}/>
                    <Route exact path="/forgot-password"   component={ForgotPassword}/>
                    <Route exact path="/password-reset/:resettoken"   component={ResetPassword}/>

                    <UserRoute exact path="/user/history"   component={History}/>
                    <UserRoute exact path="/user/password"   component={Password}/>
                    <UserRoute exact path="/user/wishlist"   component={WishList}/>

                    <AdminRoute exact path="/admin/dashboard"   component={AdminDashboard}/>
                    <AdminRoute exact path="/admin/category"   component={AdminCategoryCreate}/>
                    <AdminRoute exact path="/admin/category/:slug"   component={AdminCategoryUpdate}/>

                    <AdminRoute exact path="/admin/sub-category"   component={AdminSubCategoryCreate}/>
                    <AdminRoute exact path="/admin/sub-category/:slug"   component={AdminSubCategoryUpdate}/>
                    
                    <AdminRoute exact path="/admin/product"   component={AdminProductCreate}/>
                    <AdminRoute exact path="/admin/products"   component={AdminProductList}/>
                    <AdminRoute exact path="/admin/products/:slug"   component={AdminProductUpdate}/>


                    <Route exact path="/products/:slug"   component={Product}/>
                    
            </Switch>
            <ToastContainer />
      </>





    // <Provider store={store}>
    //    <Router>
    //     <Fragment>
    //       <NavBar/>
         
    //       <Route exact path="/" component={Landing}/>
    //       <Alert/>
    //       <section className="container">
    //         <Switch>
    //             <Route exact path="/login"   component={Login}/>
    //             <Route exact path="/register"   component={Register}/>
    //             <PrivateRoute exact path="/dashboard"   component={Dashboard}/>
    //             <PrivateRoute exact path="/create-profile"   component={CreateProfile}/>
    //             <PrivateRoute exact path="/edit-profile"   component={EditProfile}/>
    //             <PrivateRoute exact path="/add-experience"   component={AddExperience}/>
    //             <PrivateRoute exact path="/add-education"   component={AddEducation}/>
    //             <PrivateRoute exact path="/posts"   component={Posts}/>
    //             <PrivateRoute exact path="/posts/:postid"   component={Post}/>
    //             <PrivateRoute exact path="/product/upload"   component={UploadProductPage}/>
    //             <PrivateRoute exact path="/landing-page"   component={LandingPage}/>
    //         </Switch>
    //         <ToastContainer />
    //       </section>
    //     </Fragment>
    //    </Router>
    // </Provider>
  
  );
}

export default App;
