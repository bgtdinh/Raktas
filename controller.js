const model = require('./model');

const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { username, password } = req.body;
  if(!username || !password) return res.status(400).json({ 'message': 'Username and password are required'});


  const response = await model.getUser(username);
  const responseUsername = response?.rows[0]?.username;
  if(responseUsername) return res.sendStatus(409);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const addUser = await model.addUser(username, hashedPassword);
    res.status(201).json({ 'sucess': `New user ${username} created!`});
  } catch (err) {
    res.status(500).json({ 'message': err.message});
  }


}

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if( !username || !password ) return res.status(400).json({ 'message': 'Username and password are required'});

  const response = await model.getUser(username);
  const responseUsername = response?.rows[0]?.username;
  const responsePassword = response?.rows[0]?.password;

  if(!responseUsername) return res.sendStatus(401);

  const match = await bcrypt.compare(password, responsePassword);
  if(match) {
    res.json({ 'success': `User ${username} is logged in`});
  } else {
    res.sendStatus(401);
  }
}




module.exports = {
  handleNewUser,
  handleLogin
}