const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '/home/runner/CodeDoor-FSWD-Entry-server/submodules/.env'});

async function generate_jwt(payload){

  let sign_password = process.env.JWT_PASSWORD;

  let jwt_generated = await jwt.sign({
    userId: payload
  }, sign_password, { expiresIn: '2d' });  

  console.log(jwt_generated);

  return(jwt_generated);
}

async function verify_jwt(token){
  let sign_password = process.env.JWT_PASSWORD;

  try{
    let decoded = await jwt.verify(token, sign_password);
    return(decoded.userId);
  }
  catch (err){
    console.log(err);
    return("Invalid token ");
  }

}

exports.generate_jwt = generate_jwt;
exports.verify_jwt = verify_jwt;