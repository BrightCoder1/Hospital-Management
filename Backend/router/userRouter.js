import express from "express"
import { addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login, logoutAdmin, logoutPatinet, patienRegister } from "../controller/userController.js";
import { isAdminAuthenticated, isPatinetAuthented } from "../middleware/auth.js"


const router = express.Router();


router.post("/patient/register", patienRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.get("/doctors", getAllDoctors);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/me", isPatinetAuthented, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/patient/logout", isPatinetAuthented, logoutPatinet);
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);
export default router;