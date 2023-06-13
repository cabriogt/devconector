import React,{Fragment, useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createProfile, getCurrentProfile} from '../../actions/profile'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const initialState = {
    handle:'',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername:'',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  };

const EditProfile = ({
    profile:{
        profile,
        loading
    }, 
    createProfile, getCurrentProfile,}) => {

    const [formData,setFormData]= useState(initialState)
    const [displaySocialIcon,toggleSocialIcon]= useState(false)
    const navigate = useNavigate();

    const{
        handle,
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram
    }= formData;

    

    useEffect(()=>{

        
        getCurrentProfile();

        setFormData({
            handle:loading || !profile.handle ? '':profile.handle,
            company:loading || !profile.company ? '':profile.company,
            website:loading || !profile.website ? '':profile.website,
            location:loading || !profile.location ? '':profile.location,
            bio:loading || !profile.bio ? '':profile.bio,
            status:loading || !profile.status ? '':profile.status,
            githubusername:loading || !profile.githubusername ? '':profile.githubusername,
            skills:loading || !profile.skills ? '':profile.skills.join(","),
            youtube:loading || !profile.social.youtube ? '':profile.social.youtube,
            twitter:loading || !profile.social.twitter ? '':profile.social.twitter,
            facebook:loading || !profile.social.facebook ? '':profile.social.facebook,
            linkedin:loading || !profile.social.linkedin ? '':profile.social.linkedin,
            instagram:loading || !profile.social.instagram ? '':profile.social.instagram
        });
        
    // eslint-disable-next-line
    },[loading,getCurrentProfile])

    const onChange = e => setFormData({...formData,[e.target.name]: e.target.value})

    const onSubmit = e =>{
        e.preventDefault();
        createProfile(formData,null,true).then(() => navigate('/dashboard'))
    }

  return (
        <section className="container">
            <h1 className="large text-primary">Edit Your Profile</h1>
            <p className="lead">
                <FontAwesomeIcon className='fa-user' icon={icon({name: 'user', style: 'solid'})}/>
                Let's get some information to make your profile stand out
            </p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <select name="status" value={status} onChange={e => onChange(e)}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">Give us an idea of where you are at in your career</small>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Handle" name="handle" value={handle} onChange={e => onChange(e)} />
                    <small className="form-text">Describe your current job handle</small>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Company" name="company" value={company} onChange={e => onChange(e)} />
                    <small className="form-text">Could be your own company or one you work for</small>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" value={website} onChange={e => onChange(e)} />
                    <small className="form-text">Could be your own or a company website</small>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
                    <small className="form-text">City & state suggested (eg. Boston, MA)</small>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => onChange(e)} />
                    <small className="form-text">Please use comma separated values (eg.HTML,CSS,JavaScript,PHP)</small>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Github Username" name="githubusername" value={githubusername} onChange={e => onChange(e)}/>
                    <small className="form-text">If you want your latest repos and a Github link, include your username</small>
                </div>

                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                    <button onClick={()=> toggleSocialIcon(!displaySocialIcon)} type="button" className="btn btn-light">Add Social Network Links</button>
                    <span>Optional</span>
                </div>

                {displaySocialIcon && (
                        <Fragment>
                            <div className="form-group social-input">
                                <FontAwesomeIcon className='fa-twitter' icon={icon({name:'twitter', style: 'brands'})} size='2x' style={{marginRight:'12px'}}/>
                                <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => onChange(e)} />
                            </div>

                            <div className="form-group social-input">
                                <FontAwesomeIcon className='fa-facebook' icon={icon({name:'facebook', style: 'brands'})} size='2x' style={{marginRight:'12px'}}/>
                                <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)} />
                            </div>

                            <div className="form-group social-input">
                                <FontAwesomeIcon className='fa-youtube' icon={icon({name:'youtube', style: 'brands'})} size='2x' style={{marginRight:'10px'}}/>
                                <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e => onChange(e)} />
                            </div>

                            <div className="form-group social-input">
                                <FontAwesomeIcon className='fa-linkedin' icon={icon({name:'linkedin', style: 'brands'})} size='2x' style={{marginRight:'15px'}}/>
                                <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e => onChange(e)} />
                            </div>

                            <div className="form-group social-input">
                                <FontAwesomeIcon className='fa-instagram' icon={icon({name:'instagram', style: 'brands'})} size='2x' style={{marginRight:'15px'}}/>
                                <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)} />
                            </div>
                        </Fragment>
                    ) 
                }
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-primary  my-1" to="/dashboard">Go Back</Link>
            </form>
        </section>
    )
}

EditProfile.propTypes = {
    createProfile:PropTypes.func.isRequired,
    getCurrentProfile:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    profile: state.profile
  });


export default connect(
    mapStateToProps,
    { createProfile,getCurrentProfile}
)(EditProfile)
