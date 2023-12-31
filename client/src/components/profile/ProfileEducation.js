import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';



const ProfileEducation = ({
    education:{school,degree,fieldofstudy,to,from,description} 
}) => {

  return (
    <div>
        <h3 className='text-dark'>{school}</h3>
        <p>
            <strong>From: </strong> 
            <Moment format="YYYY/MM/DD">{from}</Moment>{!to ? (<strong>  - Now </strong>) : (<Fragment><strong>To:</strong><Moment format="YYYY/MM/DD">{to}</Moment></Fragment>)}
        </p>
        
        <p>
            <strong>Degree: </strong>{degree}
        </p>
        <p>
            <strong>Field of Study: </strong>{fieldofstudy}
        </p>
        <p>
            <strong>Description: </strong>{description}
        </p>
    </div>
  )
}

ProfileEducation.propTypes = {
    education:PropTypes.array.isRequired
}

export default ProfileEducation
