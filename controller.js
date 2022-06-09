const user = require('./model');


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleNewUser = async (req, res) => {
  const { username, password } = req.body;
  if(!username || !password) return res.status(400).json({ 'message': 'Username and password are required'});

  const response = await user.findAll({
    where: {
      username: username
    }
  });
  const responseUsername = response[0]?.dataValues?.username;

  if(responseUsername) return res.sendStatus(409);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    user.create({
      username: username,
      password: hashedPassword,
      refreshtoken: ''
    });


    res.status(201).json({ 'success': `New user ${username} created!`});
  } catch (err) {
    res.status(500).json({ 'message': err.message});
  }
}

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if( !username || !password) return res.status(400).json({
    'message' : 'Username and password are required'
  });

  const response = await user.findAll({
    where: {
      username: username
    }
  });
  const responseUsername = response[0]?.dataValues?.username;
  const responsePassword = response[0]?.dataValues?.password;

  if(!responseUsername) return res.sendStatus(401);

  const match = await bcrypt.compare(password, responsePassword);

  if(match) {
    const accessToken = jwt.sign(
      {'username' : responseUsername},
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '30s'}
    );
    const refreshToken = jwt.sign(
      {'username': responseUsername},
      process.env.REFRESH_TOKEN_SECRET,
      {expiresIn: '1d'}
    );
    //save refreshtoken in db
    try {
      await user.update({
        refreshtoken: refreshToken
      }, {
        where: {
          username: username
        }
      });
    } catch (err) {
      console.log(err);
    }


    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
    res.json({ accessToken});
  } else {
    res.sendStatus(401);
  }

}


module.exports = {
  handleNewUser,
  handleLogin
}


// app.get('/',  (req, res) => {
//   user.findAll({
//     where: {
//       username: 'test2'
//     }
//   })
//     .then( (response) => {

//       console.log(response[0]?.dataValues?.username);
//       res.sendStatus(201);
//     })
//     .catch( (err) => {
//       console.error(err);
//     });
// });


// const handleNewUser = async (req, res) => {
//   const { username, password } = req.body;
//   if(!username || !password) return res.status(400).json({ 'message': 'Username and password are required'});


//   const response = await model.getUser(username);
//   const responseUsername = response?.rows[0]?.username;
//   if(responseUsername) return res.sendStatus(409);

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const addUser = await model.addUser(username, hashedPassword);
//     res.status(201).json({ 'sucess': `New user ${username} created!`});
//   } catch (err) {
//     res.status(500).json({ 'message': err.message});
//   }


// }

// const handleLogin = async (req, res) => {
//   const { username, password } = req.body;
//   if( !username || !password ) return res.status(400).json({ 'message': 'Username and password are required'});

//   const response = await model.getUser(username);
//   const responseUsername = response?.rows[0]?.username;
//   const responsePassword = response?.rows[0]?.password;

//   if(!responseUsername) return res.sendStatus(401);

//   const match = await bcrypt.compare(password, responsePassword);
//   if(match) {
//     const accessToken = jwt.sign(
//       {'username': responseUsername},
//       process.env.ACCESS_TOKEN_SECRET,
//       {expiresIn: '30s'}
//     );
//     const refreshToken = jwt.sign(
//       {'username': responseUsername},
//       process.env.REFRESH_TOKEN_SECRET,
//       {expiresIn: '1d'}
//     );
//     res.json({ 'success': `User ${username} is logged in`});
//   } else {
//     res.sendStatus(401);
//   }
// }