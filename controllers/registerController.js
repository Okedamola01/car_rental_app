const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) =>
{
    const {firstname, lastname, user, pwd, email} = req.body;
if(!firstname || !lastname || !user || !pwd || !email) {
    return res.status(400).json({'message': 'Username, password and email address required to create account!'});
}

    try {
        //check for duplicate user in DB
        const duplicate = await User.findOne({email}).exec();
        if(duplicate) {
        return res.status(409).json({'message': 'User already exists'});
        }
        
        //password encryption
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store new user
        const result = await User.create({
            'firstname': firstname,
            'lastname': lastname,
            'username': user,
            'password': hashedPwd,
            'email': email
        });

        console.log(result);
    res.status(201).json({'success': `New user ${user} successfully created!`});
    } catch (err) {
        console.error(err);
        res.status(500).json({'message': 'An error occured while creating the user'});       
    }
}

module.exports = { handleNewUser };