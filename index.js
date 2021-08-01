const mongoose = require("mongoose");
const { model, Schema } = require("mongoose");

const app = require("express")();

// Connect to mongodb
const DB = require("./db")(app);

// Department Schema
const DepartmentSchema = new Schema({
  name: String,
  location: String,
});

const Department = model("department", DepartmentSchema);

// Employee Schema
const EmployeeSchema = new Schema({
  firstName: String,
  lastName: String,
  mobile: String,
  department: { type: Schema.Types.ObjectId, ref: "department" },
});

const Employee = model("employee", EmployeeSchema);

// Company Schema
const CompanySchema = new Schema({
  name: String,
  addess: String,
  employees: [{ type: Schema.Types.ObjectId, ref: "employee" }],
});

const Company = model("company", CompanySchema);

app.use("/", async (req, res) => {
  // Create Departments
  await Department.remove({});
  await Department.create({
    name: "IT Department",
    location: "Building A",
  });
  await Department.create({
    name: "Marketing Department",
    location: "Building B",
  });

  // Create Employees
  await Employee.remove({});
  await Employee.create({
    firstName: "Victor",
    lastName: "Kjartansson",
    mobile: "1234567",
    department: await Department.findOne({ name: "IT Department" }),
  });
  await Employee.create({
    firstName: "Mary",
    lastName: "Holmes",
    mobile: "7654321",
    department: await Department.findOne({ name: "Marketing Department" }),
  });

  // Create Company
  await Company.remove({});
  await Company.create({
    name: "BigCompany",
    address: "Address 1",
    employees: await Employee.find(),
  });

  res.json({
    // Show departments
    departments: await Department.find(),
    // Show employees
    employees: await Employee.find(),
    // Show employees and departments
    employeesWithDept: await Employee.find().populate("department", "name"),
    // Show company
    company: await Company.find(),
    // Show company with employees
    companyWithEmployees: await Company.find().populate("employees"),
    // Show company with employees and departments
    companyWithEmployeesAndDept: await Company.find().populate({
      path: "employees",
      model: "employee",
      populate: {
        path: "department",
        model: "department",
      },
    }),
  });
});
