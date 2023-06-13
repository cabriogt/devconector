import React from 'react'
import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const DashboardActions = props => {
  return (
    <div className="dash-buttons">

        <Link to="/edit-profile" className="btn btn-light">
            <FontAwesomeIcon className='text-primary' icon={icon({name:'user-circle', style: 'solid'})} style={{marginRight:'10px'}}/>
            Edit Profile
        </Link>
        
        <Link to="/add-experience" className="btn btn-light">
            <FontAwesomeIcon className='text-primary' icon={icon({name:'black-tie', style: 'brands'})} style={{marginRight:'10px'}}/>
             Add Experience
        </Link>

        <Link to="/add-education" className="btn btn-light">
            <FontAwesomeIcon className='text-primary' icon={icon({name:'graduation-cap', style: 'solid'})} style={{marginRight:'10px'}}/>
             Add Education
        </Link>
    </div>
  )
}

export default DashboardActions
