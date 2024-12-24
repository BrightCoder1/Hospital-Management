import express from "express";
import { sendMessage ,allMessage} from "../controller/messageController.js";
import { isAdminAuthenticated } from "../middleware/auth.js";

const router = express.Router()

router.post("/send", sendMessage);
router.get("/getail", isAdminAuthenticated, allMessage)
export default router;
