const User = require('../model/User');
const handleLogout = async (req, res) =>
{
    //On client, also delete the access token

    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);//No content
    const refreshToken = cookies.jwt;

    //Is refreshToken in DB?
    const findsUser = await User.findOne({refreshToken}).exec();
    if(!findsUser)
    {
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
        return res.sendStatus(204);
    }

    //Delete refreshToken in DB
    findsUser.refreshToken = '';
    const result = await findsUser.save();
    console.log(result);
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None'}); //secure: true
    res.sendStatus(204);
}

module.exports = {handleLogout};