import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLenght: [3, "First Name Must Contain At Least 3 Characters!"],
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name Must Contain At Least 3 Characters!"],

    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Provide A Valid Email!"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
        maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
    },
    dob: {
        type: String,
        required: [true, "DOB is required"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    appointment_date: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,

    },
    doctor: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        }
    },
    hasVisited: {
        type: Boolean,
        default: false
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    },
})


export const Appointment = mongoose.model("Appointment", appointmentSchema);

