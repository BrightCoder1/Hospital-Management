import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js"
import { User } from "../models/userSchema.js";

export const postAppointment = catchAsyncError(
    async (req, res, next) => {
        const { firstName,
            lastName,
            email,
            phone,
            dob,
            gender,
            appointment_date,
            department,
            doctor_firstName,
            doctor_lastName,
            hasVisited,
            address,
        } = req.body;

        if (!firstName ||
            !lastName ||
            !email ||
            !phone ||
            !dob ||
            !gender ||
            !appointment_date ||
            !department ||
            !doctor_firstName ||
            !doctor_lastName ||
            !address) {
            return next(new ErrorHandler("Please Fill FUll Form!", 400));
        }

        const isConflict = await User.find({
            firstName: doctor_firstName,
            lastName: doctor_lastName,
            role: "Doctor",
            doctorDepartment: department
        });

        if (isConflict.length === 0) {
            return next(new ErrorHandler("Doctor not found.", 404));
        }
        if (isConflict.length > 1) {
            return next(new ErrorHandler("Doctors Conflict! Please Contact Through Email or Phone!", 404))
        }


        const doctorId = isConflict[0]._id;
        console.log("Doctor ID:", doctorId);
        const patientId = req.user._id;
        console.log("Patient ID:", patientId);
        const appointment = await Appointment.create({
            firstName,
            lastName,
            email,
            phone,
            dob,
            gender,
            appointment_date,
            department,
            doctor: {
                firstName: doctor_firstName,
                lastName: doctor_lastName
            },
            hasVisited,
            address,
            doctorId,
            patientId
        });

        res.status(200).json({
            success: true,
            message: "Appointment Sent Successfully!"
        })

    }
);

