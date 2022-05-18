const model = require('./model');

const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { username, password } = req.body;
  if(!username || !password) return res.status(400).json({ 'message': 'Username and password are required'});


  const response = await model.getUser(username);
  const responseUsername = response.rows[0].username;
  if(responseUsername) return res.sendStatus(409);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
  } catch (err) {
    res.status(500).json({ 'message': err.message});
  }



}




module.exports = {
  handleNewUser
}