import type { Request, Response } from "express";
import { authService } from "./auth.service";
import sendResponse from "../../utility/sendResponse";

const signUpUser = async (req: Request, res: Response) => {
    try {
        const result = await authService.signUpUserIntoDB(req.body)

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User registered successfully",
            data: result.rows[0]
        })
    } catch (error: any) {

        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message
        })
    }
}

const logInUser = async (req: Request, res: Response) => {
    try {
        const result = await authService.logInUserIntoDB(req.body)

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "User logged in successfully",
            data: result
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message
        })
    }
}

export const authController = {
    signUpUser,
    logInUser
}