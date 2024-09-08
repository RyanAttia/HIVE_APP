import jwt from 'jsonwebtoken'

const generate_token_and_set_cookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
        expiresIn: '15d'
    });
    
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60* 100, //MS
        httpOnly: true, // prevent XSS attacks aka cross-site scripting attacks
        samSite: "strict", // CSRF attacks aka cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development" // cookie only works in https
    });
};
export default generate_token_and_set_cookie