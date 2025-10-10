import express from "express";
import {
  addEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", getEmployee);
router.post("/add", addEmployee);
router.get("/single/:id", getEmployees);
router.put("/update/:id", updateEmployee); 

export default router;
