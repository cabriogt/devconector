import React,{Fragment, useEffect} from 'react'
import {Link} from "react-router-dom";
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {deleteAccount, getCurrentProfile} from '../../actions/profile'
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';


const Dashbord =({
  deleteAccount,
  getCurrentProfile,
  auth:{user},
  profile:{profile}}) => {
  
  useEffect(()=>{
    getCurrentProfile();
  },[getCurrentProfile])

  const onClick = (e)=>{
    deleteAccount()
  }

  return (

         <section className="container">
           <h1 className="large text-primary">Dashboard</h1>
           <p className="lead">
             <FontAwesomeIcon className='fa-user' icon={icon({name: 'user', style: 'solid'})}/>
             Welcome  {user && user.name}
           </p>
           {profile !== null ? (
               <Fragment>
                 <DashboardActions/>
                 <Experience experience={profile.experience}/>
                 <Education education={profile.education}/>
                 <div className='my-2'>
                   <button onClick={onClick} className="btn btn-danger">
                    <FontAwesomeIcon className='fa-user-minus' icon={icon({name: 'user', style: 'solid'})}/>
                    Delete my Account
                   </button>
 
                 </div>
               </Fragment>
             ) : (
               <Fragment>
                 <p className='container'>You have not yet setup a profile</p>
                 <Link className='btn btn-primary my-1' to='/create-profile'>
                   Create a Profile
                 </Link>
               </Fragment>
             )
           }
         </section>
 
      
  )
}


Dashbord.propTypes = {
  getCurrentProfile:PropTypes.func.isRequired,
  deleteAccount:PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile:PropTypes.object.isRequired
}

const mapStateToProps = state =>({
  auth: state.auth,
  profile: state.profile
})

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    deleteAccount
  })(Dashbord)

