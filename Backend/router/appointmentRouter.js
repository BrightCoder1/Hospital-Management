import express from "express"
import { postAppointment } from "../controller/appointmentController.js";
import { isPatinetAuthented } from "../middleware/auth.js";

const router = express.Router()

router.post("/post", isPatinetAuthented, postAppointment);

export default router