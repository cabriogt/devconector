const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const {check,validationResult} = require('express-validator')


//@route GET api/auth
//@desd Test route
//@access Public

router.get('/',auth,async(req,res)=>{
    try {
        const user = await User.findById(req.user.id,'-password')
        res.json(user)
        
    } catch (error) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

//@route POST api/auth
//@desd  Autenticate user & get token 
//@access Public

router.post('/',[
    check('email','please include a valid email').isEmail(),
    check('password','Password is required').exists()
    ],async(req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
    const {email,password} = req.body;

    //See if user exists

    try {

        let user = await User.findOne({email});
        

        if(!user){
            return res.status(400).json({errors:[{msg:'Invalid Credentials'}]})
        }


        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(401).json({errors:[{msg:'Invalid Credentials'}]})            
        }

        const payload = {
            user:{
                id:user.id
            }
        }
        jwt.sign(
            payload,
            config.get('secretToken'),
            {expiresIn:360000},
            (err,token)=>{
                if(err) throw err;
                res.json({token})
            }
        )
        
    } catch (error) {
        console.log(error.message)
    }


})

module.exports = router;