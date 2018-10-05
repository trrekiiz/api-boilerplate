const jsonwebtoken = require("jsonwebtoken");
export default async (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs' , function (err, decode){
      if(err) {
        res.status(401).json({ message: 'Unauthorized user!' });
      }else{
        req.user = decode;
        next();
      }
    });
  } else {
    req.user = undefined;
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
}