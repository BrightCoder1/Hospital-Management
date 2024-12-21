import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";

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
        role:"Admin"
    });
    res.status(200).json({
        success:true,
        message:"New Admin Add"
    })
});