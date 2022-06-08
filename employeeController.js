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

const getEmployeeById = async (req, res) => {
  const {id} = req.params;

  if(!id) return res.status(400).json({'message': 'id is required'});

  try {
    const response = await employee.findAll({
      where: {
        id: id
      }
    });
    res.send(response);
  } catch {
    res.status(500).json({'message' :err.message});
  }
}

const editEmployee = (req, res) => {
  const { id } = req.params;
  const { firstname, lastname } = req.body;
  console.log(id);
  console.log(firstname);
  console.log(lastname);
  if(!id) return res.status(400).json({'message': 'id is required'});

  if(!firstname || !lastname) return res.status(400).json({ 'message': 'Firstname and lastname are required'});

  try {
    employee.update({
      firstname: firstname,
      lastname: lastname,
    }, {
      where: {
        id: id
      }
    });
    res.status(201).json({ 'success': `New Employee ${id} ${firstname} ${lastname} edited!`});
  } catch (err) {
    res.status(500).json({'message' :err.message});
  }



}

const deleteEmployee = (req, res) => {
  const {id} = req.params;
  if(!id) return res.status(400).json({'message': 'id is required'});

  try {
    employee.destroy({
      where: {
        id: id
      }
    });
    res.status(201).json({'success' : `Employee ${id} deleted`});
  } catch (err) {
    res.status(500).json({'message': err.message});
  }


}

module.exports = {
  getAllEmployees,
  addEmployee,
  editEmployee,
  deleteEmployee,
  getEmployeeById
}