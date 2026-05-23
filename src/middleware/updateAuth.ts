import type { NextFunction, Request, Response } from "express";
import { pool } from "../db";

const updateAuth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userRole = req.user?.role;
            const userEmail = req.user?.email;
            const issueId = req.params.id;
            
            if (userRole === "maintainer") {
                return next();
            }

            const issueData = await pool.query(
                `
                SELECT * FROM issues
                WHERE id = $1
                `, [issueId]);

            if (issueData.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Issue not found"
                });
            }

            const issue = issueData.rows[0];

            if (issue.email !== userEmail) {
                return res.status(403).json({
                    success: false,
                    message: "You can only update your own issue"
                });
            }

            if (issue.status !== "open") {
                return res.status(403).json({
                    success: false,
                    message: "Only open issues can be updated"
                });
            }

            next();

        } catch (error) {
            next(error);
        }
    };
};

export default updateAuth;