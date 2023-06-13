import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const ProfileAbout = ({profile:{bio,skills,user:{name}}} ) => {
  return (
    <div className="profile-about bg-light p-2">
          
          {bio && (
            <Fragment>
                <h2 className="text-primary">{name}</h2>
                <p>
                    {bio}
                </p>
            </Fragment>
          )}
          
          <div className="line"></div>
            <h2 className="text-primary">Skill Set</h2>
            <div className="skills">
                {skills.map((skill,index) =>
                    <div key={index} className="p-1">
                        <FontAwesomeIcon style={{marginRight:'10px'}} icon={icon({name:'check',style:'solid'})} />
                        {skill}
                    </div>
                )}
            </div>
        </div>
  )
}


ProfileAbout.propTypes = {
    profile:PropTypes.object.isRequired
}

export default ProfileAbout
