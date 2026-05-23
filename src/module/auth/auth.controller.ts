import type { Request, Response } from "express";
import { authService } from "./auth.service";

const signUpUser = async(req:Request, res: Response) => {
    try {
        const result = await authService.signUpUserIntoDB(req.body)
        res.status(200).json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}

const logInUser = async (req: Request, res: Response) =>{
    try {
        const result = await authService.logInUserIntoDB(req.body)

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: error.message,
        })
    }
}

export const authController = {
    signUpUser,
    logInUser
}