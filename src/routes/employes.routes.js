import { Router } from "express";
import { getEmployees, getEmploye,postEmployees, updateEmployees, deleteEmployees } from "../controllers/employes.controller.js";

const router = Router();

router.get('/employees', getEmployees)

router.get('/employees/:id', getEmploye)

router.post('/employees', postEmployees)

router.patch('/employees/:id', updateEmployees)

router.delete('/employees/:id', deleteEmployees)

export default router