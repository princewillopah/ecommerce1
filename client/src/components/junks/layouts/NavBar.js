import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../store/actions/authAction';


const NavBar = ({auth:{isAuthenticated,loading,user},logout}) => {
    const guestsLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item"><Link className="nav-link" to="profiles.html">Developers</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/register"><i className="fa fa-key"></i> Register</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/login"><i className="fa fa-signing"></i> Login</Link></li>
        </ul>
    )
    const authsLinks = (<>
        <ul className="navbar-nav">
        <li className="nav-item"><Link className="nav-link" to="/landing-page"> <i className="fa fa-dashboard"></i> Products</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/dashboard"> <i className="fa fa-dashboard"></i> Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/posts"><i className="fa fa-signing"></i> Posts</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/product/upload"><i className="fa fa-upload"></i> Upload</Link></li>
        </ul>
        <ul className="navbar-nav ml-auto">
    <li className="nav-item"><Link className="nav-link" to="/posts">
          <img src={user && `http://localhost:5000/${user.photo}`} alt="" style={{width:'50px',height:'50px',borderRadius:'50%',border:'solid 2px #aaa'}}/>{' '}
         Hi, {user && user.name}</Link></li>
            <button className="btn " style={{background:'transparent',border:'none',color:'#aaa'}}  onClick={logout}><i className="fa fa-sign-out"></i> Logout</button>
        </ul>
    </>)
   return( 
        
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
            <Link to="/" className="navbar-brand" ><i className="fa fa-code"></i> DevConnector</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
            {!loading && (<Fragment>{isAuthenticated ? authsLinks : guestsLinks }</Fragment>)}
            </div>
        </nav>
);
}
const mapStateToProps = (state) => ({
        auth : state.auth//get all in auth state
})
export default connect(mapStateToProps,{logout})(NavBar)