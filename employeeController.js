const employee = require('./employeeModel');

const getAllEmployees = async (req, res) => {
  const response = await employee.findAll();
  res.send(response);
}

const addEmployee = (req, res) => {
  const { firstname, lastname } = req.body;
  if(!firstname || !lastname) return res.status(400).json({ 'message': 'Firstname and lastname are required'});

  try {
    employee.create({
      firstname: firstname,
      lastname: lastname,
    });


    res.status(201).json({ 'success': `New Employee ${firstname} ${lastname} created!`});
  } catch (err) {
    res.status(500).json({ 'message': err.message});
  }

}

module.exports = {
  getAllEmployees,
  addEmployee
}