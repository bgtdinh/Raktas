const chai = require('chai');
const server = require('./index');
const chaihttp = require('chai-http');
const employee = require('./employeeModel');

chai.should();
chai.use(chaihttp);


describe('Employee API', () => {

  describe('POST /employees', () => {
    //async await awat for chai does not use callbacks so no end nor done
    it('it should add an employee', async () => {
      await employee.drop();
      await employee.sync();

      const newEmployee = {
        firstname: 'John',
        lastname: 'Doe'
      }
      const response = await chai.request(server)
      .post('/employees')
      .send(newEmployee)
      response.should.have.status(201);
    })
    it('it should check if employee was added to database', (done) => {
      const employeeId = 1;
      chai.request(server)
      .get('/employees/' + employeeId)
      .end( (err, response) => {
        response.should.have.status(200);
        response.body.should.deep.equal([ { id: 1, firstname: 'John', lastname: 'Doe' } ]);
        done();
      })
    })
  })

  describe('GET /employees', () => {
    it('it should getll all the employees', (done) => {
      chai.request(server)
        .get('/employees')
        .end( (err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
        done();
        })
    })
    it('it should not get all employees', (done) => {
      chai.request(server)
        .get('/employee')
        .end( (err, response) => {
          response.should.have.status(404);
        done();
        })
    })
  })
  describe('GET /employees/:id', () => {
    it('it should get one employee by id with parameters', (done) => {
      const employeeId = 1;
      chai.request(server)
      .get('/employees/' + employeeId)
      .end( (err, response) => {
        response.should.have.status(200);
        response.body.should.deep.equal([ { id: 1, firstname: 'John', lastname: 'Doe' } ]);
        done();
      })
    })
  })
  describe('PUT /employees/:id', () => {
    it('it should put an employee', async () => {
      const employeeId = 1;
      const edittedEmployee = {
        firstname: 'Mocha',
        lastname: 'Chai'
      };

      const response = await chai.request(server)
      .put('/employees/' + employeeId)
      .send(edittedEmployee)
      response.should.have.status(201);
    })
    it('it should check if employee is editted', async () => {
      const employeeId = 1;
      const response = await chai.request(server)
        .get('/employees/' + employeeId)

      response.should.have.status(200);
      response.body.should.deep.equal([ { id: 1, firstname: 'Mocha', lastname: 'Chai' } ]);
    })


  })
  describe('DELETE /employees/', () => {
    it('it should add an employee', async () => {

      const newEmployee = {
        firstname: 'John',
        lastname: 'Doe'
      }
      const response = await chai.request(server)
      .post('/employees')
      .send(newEmployee)
      response.should.have.status(201);
    })
    it('it should get ALL employees and list should be 2 items', async () => {
      const response = await chai.request(server)
        .get('/employees')

        response.should.have.status(200);
        response.body.should.be.a('array');
        console.log(response.body[1]);
        response.body[1].should.deep.equal( { id: 2, firstname: 'John', lastname: 'Doe' } );
    })
    it('it should delete an employee by id', async () => {

      const employeeId = 2;

      const response = await chai.request(server)
        .delete('/employees/' + employeeId)
      response.should.have.status(201);
    })

  })




})
