import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';


const NotFound = () => {
  return (
    <section className='container'>
        <h1 className='x-large text-primary'>
            <FontAwesomeIcon style={{marginRight:'10px'}} icon={icon({name:'triangle-exclamation',style:'solid'})} />
        </h1>
        <p className='large'>
            Sorry, this page does not exist
        </p>
    </section>
    
  )
}

export default NotFound
