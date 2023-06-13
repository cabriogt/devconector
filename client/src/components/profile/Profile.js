import {Fragment, useEffect}from 'react';
import {useParams,Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import {getProfileById} from '../../actions/profile';

function Profile({getProfileById,profile:{profile},auth}) {
    const {id} = useParams();

    useEffect(()=>{
        getProfileById(id)
    },[getProfileById,id])


  return (
            <Fragment>
                {profile === null ? <Spinner/> : (<Fragment>
                    <section className='container'>
                        <Link className='btn btn-light'  to='/profiles'>Back to Profiles &rarr;</Link>
                        {auth.isAuthenticated &&
                            auth.loading === false && 
                            auth.user._id === profile.user._id 
                            && (
                            <Link className='btn btn-dark' to='/edit-profile'>
                                Edit Profile
                            </Link>)
                        }
                        <div class="profile-grid my-1">
                            <ProfileTop profile={profile}/>
                            <ProfileAbout profile={profile}/>
                            <div className="profile-exp bg-white p-2">
                                <h2 class="text-primary">Experience</h2>
                                {profile.experience.length> 0 ? (
                                    <Fragment>
                                        {profile.experience.map(experience =>(
                                            <ProfileExperience key={experience._id} experience={experience}/>)
                                        )}
                                    </Fragment>) : (
                                    <h4>No experience credentials</h4>
                                )}
                            </div>
                            <div className="profile-edu bg-white p-2">
                                <h2 class="text-primary">Education</h2>
                                {profile.education.length> 0 ? (
                                    <Fragment>
                                        {profile.education.map(education =>(
                                            <ProfileEducation key={education._id} education={education}/>)
                                        )}
                                    </Fragment>) : (
                                    <h4>No Education credentials</h4>
                                )}
                            </div>
                            {profile.githubusername &&(
                                 <ProfileGithub />
                            )}
                        </div>
                    </section>
                </Fragment>
                )}
            </Fragment>
    
    
  )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
  });
  
  export default connect(mapStateToProps, { getProfileById })(Profile);
