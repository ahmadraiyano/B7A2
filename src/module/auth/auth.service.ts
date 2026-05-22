import { pool } from "../../db"
import type { SignUP } from "./auth.type"
import bcrypt from "bcryptjs"

const signUpUserIntoDB = async (payload: SignUP) => {
    const { name, email, password, role } = payload
    const hashedPassword = await bcrypt.hash(password,10)
    
    const result = await pool.query(`
            INSERT INTO users(name,email,password,role)
            VALUES ($1,$2,$3, $4)
            RETURNING *
        `,[name,email,hashedPassword, role ?? 'contributor'])
        delete result.rows[0].password
    return result
}

export const authService = {
    signUpUserIntoDB
}