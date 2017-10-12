// MEDIUM: Create an express API that will have 10 employees in it, their employeeID, their name, their salary and department name. 
// When you hit the endpoint with a GET request we want the api to respond with all data on the employees. 
// If you hit the endpoint with their employeeID, we want to hand up only the information on that one employee. 
// If you hit the endpoint with an incorrect employeeID, send back the correct HTTP status code and an error message stating that the employee was not found.
// GET::myendpointname.com/employees = Json with information from all 10 employees.
// GET::myendpointname.com/employees/<employeeID> = Json with the information from that specific employee.

const express = require('express');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Employee} = require('./models/employee');

// Create the express application
var app = express();
const port = process.env.PORT || 3000;

// GET Request to grab all employees data
app.get('/employees', (req, res) => {
    Employee.find().then((employees) => {
        res.send({employees});
    }).catch((e) => {
        res.status(404).send();
    });
});

// GET Request to grab employee data by ID
app.get('/employees/:id', (req, res) => {
    // grab the variable passed in as a parameter
    var id = req.params.id;

    // validate ID using ObjectID method isValid
    if (!ObjectID.isValid(id)) {
        // if invalid, stop function execution and respond with 404, send back empty body
        return res.status(404).send();
    }

    // Find employee by ID and handle errors if not found
    Employee.findById(id).then((employee) => {
        if (!employee) {
            return res.status(404).send('Employee not found');
        }
        res.send({employee});
            
    }).catch((e) => {
        res.status(404).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};