import type { Request, Response } from "express";
import { issuesService } from "./issues.service";

const createIssues = async (req: Request, res: Response) => {
    try {
        const result = await issuesService.createIssuesIntoDB(req.body, req.user?.id)
        
        res.status(200).json({
            success: true,
            message: "Issue created successfully",
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

const getAllIssues = async (req: Request, res: Response) => {
    try {
        const result = await issuesService.getAllIssuesFromDB()
        res.status(200).json({
            success: true,
            message: "Issues retrieved successfully",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}

const getSingleIssue = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const result = await issuesService.getSingleIssueFromDB(id as string)
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Issue data does not exist"
            })
        }

        res.status(200).json({
            success: true,
            message: "Issue retrieved successfully",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}

const updateIssue = async (req: Request, res: Response) => {
   try {
        const {id} = req.params
        const result = await issuesService.updateIssueFromDB(req.body, id as string)
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Issue data does not exist"
            })
        }

        res.status(200).json({
            success: true,
            message: "Issue updated successfully",
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

const deleteIssue = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const result = await issuesService.deleteIssueFromDB(id as string)

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "users data does not exist"
            })
        }
        
        res.status(200).json({
            success: true,
            message: "Issue deleted successfully"
        })
    } catch (error: any) {
        res.status(500).json({
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