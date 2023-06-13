import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const ProfileTop = ({profile:{
    status,
    company,
    location,
    website,
    social,
    user:{
        name,
        avatar
    }
}}) => {

  return (
            <div className="profile-top bg-primary p-2">
                <img
                    className="round-img my-1"
                    src={avatar} />
                <h1 className="large">{name}</h1>
                <p className="lead">
                    {status} {company && <span> at {company}</span>}
                </p>
                <p>{location && <span>{location}</span>}</p>
                    <div className="icons my-1">
                        { website && (
                                <Link to={`https://${website}`} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon style={{marginRight:'10px'}} icon={icon({name:'globe',style:'solid'})} />
                                </Link>)
                        }
                        {social && social.twitter && (
                            <Link to={social.twitter} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon style={{marginRight:'10px'}} icon={icon({name:'twitter',style:'brands'})} />
                            </Link>)
                        }
                        {social && social.facebook && (
                            <Link to={social.facebook} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon style={{marginRight:'10px'}} icon={icon({name:'facebook',style:'brands'})} />
                            </Link>

                        )}
                        {social && social.linkedin && (
                            <Link to={social.linkedin} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon style={{marginRight:'10px'}} icon={icon({name:'linkedin',style:'brands'})} />
                            </Link>
                        )}
                        {social && social.youtube && (
                            <Link to={social.youtube} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon style={{marginRight:'10px'}} icon={icon({name:'youtube',style:'brands'})} />
                            </Link>
                        )}
                        {social && social.instagram && (
                            <Link to={social.instagram} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon style={{marginRight:'10px'}} icon={icon({name:'instagram',style:'brands'})} />
                            </Link>
                        )}
                    </div>
            </div>
    
  )
}

ProfileTop.propTypes = {
    profile:PropTypes.object.isRequired
}

export default ProfileTop
