import express from "express"
import { addNewAdmin, login, patienRegister } from "../controller/userController.js";
const router = express.Router();


router.post("/patient/register",patienRegister);
router.get("/login",login);
router.post("/admin/addnew",addNewAdmin);
export default router;