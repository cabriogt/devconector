import React,{Fragment} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import {logout} from '../../actions/auth'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const Navbar = ({auth:{isAuthenticated},logout}) => {
  
  const authLinks = (
      <ul>
        <li>
          <Link to='/dashboard'>
            <FontAwesomeIcon  icon={icon({name:'user',style:'solid'})} />
              <span className='hide-sm'>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to='/profiles'>
            <FontAwesomeIcon style={{marginRight:'10px'}} icon={icon({name:'connectdevelop',style:'brands'})} />
              <span className='hide-sm'>Developers</span>
          </Link>
        </li>
        <li>
          <Link to='/posts'>
            <FontAwesomeIcon style={{marginRight:'10px'}} icon={icon({name:'comment',style:'solid'})} />
              <span className='hide-sm'>Posts</span>
          </Link>
        </li>
        <li>
          <Link to='#!' onClick={logout}>
            <FontAwesomeIcon style={{marginRight:'10px'}} icon={icon({name:'arrow-right-from-bracket',style:'solid'})} />
              <span className='hide-sm'>Log Out</span>
          </Link>
        </li>
      </ul>
  )

  const guestLinks = (
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/profiles'>Developers</Link></li>
        <li><Link to='/register'>Register</Link></li>
        <li><Link to='/login'>Login</Link></li>
      </ul>
  )




  return ( 

  
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <FontAwesomeIcon style={{marginRight:'10px'}} icon={icon({name:'code',style:'solid'})} />
            DevConnector
          </Link>
        </h1>
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
