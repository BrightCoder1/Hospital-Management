import express from "express"
import { deleteAppointment, getAllAppointment, postAppointment, updateAppointmentStatus } from "../controller/appointmentController.js";
import { isAdminAuthenticated, isPatinetAuthented } from "../middleware/auth.js";

const router = express.Router()

router.post("/post", isPatinetAuthented, postAppointment);
router.get("/getall", isAdminAuthenticated, getAllAppointment);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);
export default router