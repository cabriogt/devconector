const express = require('express')
const request = require('request')
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth')
const {check,validationResult} = require('express-validator')



const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Post = require('../../models/Post')


//@route GET api/users
//@desd Test route
//@access Public

router.get('/me',auth,async(req,res)=>{

    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user',['name','avatar']);
        if(!profile){
            return res.status(400).json({errors:[{msg:'Tehere is no aprofile for this user'}]})            
        }
        res.json(profile);
    } catch (error) {
        console.error(error.message)
        return res.status(500).send('Server Error')            
        
    }
})


//@route GET api/users
//@desd GGet all Profiles
//@access Public

router.get('/',auth,async(req,res)=>{

    try {
        const profiles = await Profile.find().populate('user',['name','avatar']);
        if(!profiles){
            return res.status(400).json({errors:[{msg:'Tehere is no aprofile for this user'}]})            
        }
        res.json(profiles);
    } catch (error) {
        console.error(error.message)
        return res.status(500).send('Server Error')            
        
    }
})

//@route GET api/profile/user/user_id
//@desd GET profile by id
//@access Public

router.get('/user/:user_id',async(req,res)=>{

    const {user_id} = req.params;

    try {
        const profile = await Profile.findOne({user:user_id}).populate('user',['name','avatar']);
        if(!profile){
            return res.status(400).json({errors:[{msg:'Profile not found'}]})            
        }
        res.json(profile);
    } catch (error) {
        console.error(error.message)
        if(error.kind == 'ObjectId'){
            return res.status(400).json({msg:'Profile not found'})

        }
        return res.status(500).send('Server Error')            
        
    }
})

//@route DELETE api/profile/user/user_id
//@desd Delete profile,user & posts
//@access Private

router.delete('/',auth,async(req,res)=>{

    try {
        
        //Remove User Post

        await Post.deleteMany({user:req.user.id})

        //Remove Profile

        await Profile.findOneAndRemove({user: req.user.id});
        
        //Remove User
        await User.findOneAndRemove({_id: req.user.id});
        
        res.json({message:"User Delete"});
    } catch (error) {
        console.error(error.message)
        return res.status(500).send('Server Error')            
        
    }
})



//@route POST api/profile
//@desc create  or update user profile
//@access Public

router.post('/',[auth,[
    check('status','Status is required')
        .not()
        .isEmpty(),
    check('skills','Skills is require')
        .not()
        .isEmpty()]
],async(req,res)=>{
    const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

    const {
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
    } = req.body;

    //Build Prodile obj

    const profileFields = {};
    profileFields.user = req.user.id;
    if(handle) profileFields.handle = handle;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills){
        profileFields.skills= skills.toString().split(',').map((skill) => skill.trim());  
    }

    //Build social obj 
    profileFields.social = {}
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;

    try {
        let profile = await Profile.findOne({user: req.user.id}) 

        if(profile){
            //update profile
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set:profileFields},
                {new:true}
            )
            return res.json(profile)

        }
        //create profile
        profile = new Profile(profileFields);
        await profile.save()
        return res.json(profile)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
        
    }
})


// @ route   PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
    '/experience',
    [
      auth,
      [
        check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company is required').not().isEmpty(),
        check('from', 'From date is required').not().isEmpty(),
      ],
    ],
    async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      } = req.body
  
      const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      }
      try {
        const profile = await Profile.findOne({ user: req.user.id })
        profile.experience.unshift(newExp)
        await profile.save()
        res.json(profile)
      } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
      }
    },
  )
  
  
// @ route   DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id })
  
      // Get remove index
      const removeIndex = profile.experience
        .map((item) => item.id)
        .indexOf(req.params.exp_id)
      profile.experience.splice(removeIndex, 1)
      await profile.save()
      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  })



//@route PUT api/profile/education
//@desc  add experience
//@access Private

router.put('/education',[
    auth,[
        check('school','School is required')
            .not()
            .isEmpty(),
        check('degree','Degree is required')
            .not()
            .isEmpty(),
        check('fieldofstudy','Field of study is required')
            .not()
            .isEmpty(),
        check('from','From date is required')
            .not()
            .isEmpty()    
    ]],async (req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;

        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }

        try {

            const profile= await Profile.findOne({user: req.user.id})
            profile.education.unshift(newEdu);
            await profile.save()
            res.json(profile)
            
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
            
        }

})

//@route DELETE api/profile/education/:edu_id
//@desc  delete education from profile
//@access Private

router.delete('/education/:edu_id',auth,async (req,res)=>{

        try {


            const profile= await Profile.findOne({user: req.user.id})

            const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

            profile.education.splice(removeIndex,1)
            await profile.save()
            res.json(profile)
            
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }

})




router.get('/github/:username',async (req,res)=>{
    const gitId = config.get('gitId');
    const gitSecret = config.get('gitSecret');

    try {

        const options ={
            uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${gitId}&client_secret=${gitSecret}`,
            method:'GET',
            headers:{'user-agent':'node.js'}
        }

        request(options,(error,response,body)=>{
            if(error){
                console.log(error)
            }
            if(response.statusCode !== 200){
                res.status(404).json({message:'No Github profile found'});
            }
            res.json(JSON.parse(body))
        })
        
    } catch (error) {
        console.error(error)
        res.status(500).send('Server Error')
    }

})

module.exports = router;