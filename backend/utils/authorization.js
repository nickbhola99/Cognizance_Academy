import jwt from 'jsonwebtoken'
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'].split(" ")[1];
    console.log(token);
    
    if (!token){
        return res.status(401).json({error: 'Unauthorized Access, please create an Account'})
    }
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err){
            console.log(err);
            
            return res.status(401).json({error: 'Unauthorized Access, please create an Account'})
        }
        req.user = decoded;
        next();
    });
}
export default verifyToken;