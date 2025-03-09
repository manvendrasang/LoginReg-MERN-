const User = require('../models/user')
const test = (req, res) => {
    res.json('Test is working')
}

const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        
        //check if name was entered
        if (!name){
            return res.json({
                error: 'name is required.'
            })
        };
        
        //check if password is good
        if(!password || password.length < 8){
            return res.json({
                error: 'password is required and should be atleast 8 characters long.'
            })
        };
        
        //check email
        const exist = await User.findOne({email});
        if (exist){
            return res.json({
                error: 'email is already in use, please use a different one.'
            })
        };
        
        const user = await User.create({
            name, email, password
        })

        return res.json(user)

    } catch (error){
        console.log(error)
    }
}

module.exports = {
    test,
    registerUser
}