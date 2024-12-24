import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";



export const patienRegister = catchAsyncError(async (req, res, next) => {
    const { firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        password,
        role,
    } = req.body;

    if (!lastName || !email || !phone ||
        !dob || !gender || !password ||
        !role) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    } else {
        let user = await User.findOne({ email });

        if (user) {
            return next(new ErrorHandler("User Already Register!", 400))
        }
        user = await User.create({
            firstName,
            lastName,
            email,
            phone,
            dob,
            gender,
            password,
            role
        })
        generateToken(user, "User Registered", 200, res);

    }
})


export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;

    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please Enter Valid Details"), 400)
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password & Confirm Password Do not Match!"), 400)
    } else {
        const user = await User.findOne({ email: email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Invalid Password Or Email.."), 400);
        } else {
            const isPasswordMatched = await user.comprePassword(password);
            if (!isPasswordMatched) {
                return next(new ErrorHandler("Invalid Password Or Email.."), 400);
            }
            if (role !== user.role) {
                return next(new ErrorHandler("User With This Role Not Found!"), 400);
            }

            generateToken(user, "User Login!..", 200, res);
        }
    }
})

export const addNewAdmin = catchAsyncError(async (req, res, next) => {
    const { firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        password } = req.body;

    if (!firstName || !lastName || !email || !phone || !dob || !gender || !password) {
        return next(new ErrorHandler("Please Fill Full Form!", 400))
    }
    const isRegister = await User.findOne({ email });
    if (isRegister) {
        return next(new ErrorHandler("Admin With This Email Alerady Exists!", 400))
    }
    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        password,
        role: "Admin"
    });
    res.status(200).json({
        success: true,
        message: "New Admin Add"
    })
});



// get the Doctor
export const getAllDoctors = catchAsyncError(
    async (req, res, next) => {
        const doctors = await User.find({ role: "Doctor" });

        res.status(200).json({
            success: true,
            doctors
        })
    }
)



//get user details

export const getUserDetails = catchAsyncError(
    async (req, res, next) => {
        const user = req.user;

        res.status(200).json({
            success: true,
            user
        })
    }
)



export const logoutAdmin = catchAsyncError(
    async (req, res, next) => {
        res.status(200).cookie("adminToken", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
        }).json({
            success: true,
            message: "User Log Out Successfully!"
        })
    }
)


export const logoutPatinet = catchAsyncError(
    async (req, res, next) => {
        res.status(200).cookie("patientToken", "", {
            httpOnly: true,
            expires: new Date(Date.now())
        }).json({
            success: true,
            message: "Patient Logout Successfully!"
        })
    }
)



// add new doctor
export const addNewDoctor = catchAsyncError(
    async (req, res, next) => {
        // if (!req.files || Object.keys(req.files).length === 0) {
        //     return next(new ErrorHandler("Doctor Avtar Required", 400));
        // }

        // const { docAvatar } = req.files;
        // const allowedFormats = ["/image/png", "image/jpeg", "/image/webp"];

        // if (!allowedFormats.includes(docAvatar.mimetype)) {
        //     return next(new ErrorHandler("File Format Not Supported!", 400));
        // }

        const {
            firstName,
            lastName,
            email,
            phone,
            dob,
            gender,
            password,
            doctorDepartment,

        } = req.body;

        if (!firstName ||
            !lastName ||
            !email ||
            !phone ||
            !dob ||
            !gender ||
            !password ||
            !doctorDepartment) {
            return next(new ErrorHandler("Please Provide Full Details", 400));
        }

        const isRegistered = await User.findOne({ email: email });

        if (isRegistered) {
            return next(new ErrorHandler("User Already Register.", 400));

        }
        // const cloudinaryRespose = await cloudinary.uploader.upload(docAvatar.tempFilePath);

        // if(!cloudinaryRespose || cloudinaryRespose.error){
        //     console.error("Cloudinary Error:", cloudinaryRespose.error || "Unkown Cloudinary Error");
        // }

        const doctor = await User.create({
            firstName,
            lastName,
            email,
            phone,
            dob,
            gender,
            password,
            doctorDepartment,
            role:"Doctor",
            // docAvtar:{
            //     public_id:cloudinaryRespose.public_id,
            //     url:cloudinaryRespose.secure_url,
            // }
        });
        res.status(200).json({
            success:true,
            message:"New Doctor Register",
            doctor
        })
    }
)