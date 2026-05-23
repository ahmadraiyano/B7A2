import type { Request, Response } from "express";
import { issuesService } from "./issues.service";
import sendResponse from "../../utility/sendResponse";

const createIssues = async (req: Request, res: Response) => {
    try {
        const result = await issuesService.createIssuesIntoDB(req.body, req.user?.id)

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Issue created successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error
        })
    }
}

const getAllIssues = async (req: Request, res: Response) => {
    try {
        const result = await issuesService.getAllIssuesFromDB()

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "All issues retrieved successfully",
            data: result.rows
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error
        })
    }
}

const getSingleIssue = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await issuesService.getSingleIssueFromDB(id as string)

        if (result.rows.length === 0) {
            return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "Issue data not found"
            })
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Single issue retrieved successfully",
            data: result.rows
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error
        })
    }
}

const updateIssue = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await issuesService.updateIssueFromDB(req.body, id as string)

        if (result.rows.length === 0) {
            return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "Issue data not found"
            })
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issue data updated successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error
        })
    }
}

const deleteIssue = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await issuesService.deleteIssueFromDB(id as string)

        if (result.rowCount === 0) {
            return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "Issue data not found"
            })
        }

        sendResponse(res, {
            statusCode: 204,
            success: true,
            message: "Issue data deleted successfully"
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error
        })
    }
}

export const issuesController = {
    createIssues,
    getAllIssues,
    getSingleIssue,
    deleteIssue,
    updateIssue
}