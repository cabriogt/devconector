import React,{useEffect} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import {getGitHubRepos} from '../../actions/profile'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';


const ProfileGithub = ({username,getGitHubRepos,repos}) => {
    
    useEffect(()=>{
        getGitHubRepos(username)
    },[getGitHubRepos])

  return (
    <div className="profile-github">
        <h2 className="text-primary my-1">
            <FontAwesomeIcon style={{marginRight:'10px'}} icon={icon({name:'github',style:'brands'})} />
            Github Repos
        </h2>
        {repos === null ? <Spinner/> :( 
            repos.map(repo => (
                <div key={repo._id} className="repo bg-white p-1 my-1">
                    <div>
                    <h4>
                        <Link to={repo.html_url} target="_blank"
                        rel="noopener noreferrer">{repo.name}</Link>
                    </h4>
                    <p>
                        {repo.description}
                    </p>
                    </div>
                    <div>
                    <ul>
                        <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                        <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                        <li className="badge badge-light">Forks: {repo.froks_count}</li>
                    </ul>
                    </div>
                </div>
            ))

        )}
    </div>
  )
}

ProfileGithub.propTypes = {
    getGitHubRepos:PropTypes.func.isRequired,
    repos:PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
    repos: state.profile.repos
  });
  

export default connect(mapStateToProps,{getGitHubRepos}) (ProfileGithub)
