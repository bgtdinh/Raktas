const jwt = require('jsonwebtoken');
const user = require('./model');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if(!cookies?.jwt) return res.sendStatus(401);
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  //find username based on refreshtoken
  const response = await user.findAll({
    where: {
      refreshtoken: refreshToken
    }
  });

  const responseUsername = response[0]?.dataValues?.username;



  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || responseUsername !== decoded.username) return res.sendStatus(403);
      const accessToken = jwt.sign(
        { "username": decoded.username},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '30s'}
      )
      res.json( {accessToken});

    }
  )


}


module.exports = {
  handleRefreshToken
}