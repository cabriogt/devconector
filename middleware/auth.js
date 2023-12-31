const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){

    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({msg:'No token,authorization denined '})
    }

    try {
        const decoded = jwt.verify(
            token,
            config.get('secretToken')
        );

        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({errors:[{msg:'token is not valid'}]})
    }
}
