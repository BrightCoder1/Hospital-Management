import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        minLength: [6, "Password mush contain at least 6 Character"],
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
    },
    doctorDepartment: {
        type: String,
    },
    docAvtar: {
        public_id: String,
        url: String,
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    else {
        this.password = await bcrypt.hash(this.password, 10);
    }
})

userSchema.methods.comprePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
}

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRES
        }
    )
}

export const User = mongoose.model("User", userSchema);