import type { JwtPayload } from "jsonwebtoken"
import { pool } from "../../db"
import type { Issue } from "./issues.type"

const createIssuesIntoDB = async (payload: Issue, user_id: number) => {
    const { title, description, type, status } = payload

    const reporter_id = user_id


    const result = await pool.query(`
        INSERT INTO issues(reporter_id, title, description, type, status) VALUES($1,$2,$3,$4,$5) RETURNING *
        `, [reporter_id, title, description, type, status ?? 'open'])
    return result
}

const getAllIssuesFromDB = async () => {
    const result = await pool.query(`
        SELECT * FROM  issues
    `)
    return result
}

const getSingleIssueFromDB = async (id: string) => {
    const result = await pool.query(`
            SELECT * FROM issues
            WHERE id = $1
        `, [id])
    return result
}

const updateIssueFromDB = async(payload: Issue, id: string) =>{
    const {title, description, type} = payload
    const result = await pool.query(`
            UPDATE issues
            SET
                title = COALESCE($1, title),
                description = COALESCE($2, description),
                type = COALESCE($3, type),
                updated_at = NOW()
            WHERE id = $4
            RETURNING *
        `,[title, description, type, id])
        return result
}

const deleteIssueFromDB = async (id: string) => {
    const result = await pool.query(`
            DELETE FROM issues
            WHERE id = $1
        `,[id])
    return result
}


export const issuesService = {
    createIssuesIntoDB,
    getAllIssuesFromDB,
    getSingleIssueFromDB,
    deleteIssueFromDB,
    updateIssueFromDB
} 