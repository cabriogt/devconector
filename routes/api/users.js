const express = require('express')
const router = express.Router();
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const config = require('config');
const jwt = require('jsonwebtoken');
const {check,validationResult} = require('express-validator')

const User = require('../../models/User');
const { token } = require('morgan');


router.post('/',[
    check('name','Name is require')
        .not()
        .isEmpty(),
    check('email','please include a valid email')
        .isEmail(),
    check('password','please include a valid password')
        .isLength({
            min:6
        })
    ],async(req,res)=>{
    
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

    const {name,email,password} = req.body;

    //See if user exists

    try {

        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({errors:[{msg:'User already Exist'}]})
        }

        const avatar = gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password
        })

        const salt = await bcrypt.genSalt(11);

        user.password = await bcrypt.hash(password,salt);

        await user.save()

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