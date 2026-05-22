import config from "../../config"
import { pool } from "../../db"
import type { LogIn, SignUP } from "./auth.type"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const signUpUserIntoDB = async (payload: SignUP) => {
    const { name, email, password, role } = payload
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await pool.query(`
            INSERT INTO users(name,email,password,role)
            VALUES ($1,$2,$3, $4)
            RETURNING *
        `, [name, email, hashedPassword, role ?? 'contributor'])
    delete result.rows[0].password
    return result
}

const logInUserIntoDB = async (payload: LogIn) => {
    const { email, password } = payload

    const userData = await pool.query(`
            SELECT * FROM users WHERE   email = $1
        `, [email])
    if (userData.rows.length === 0) {
        throw new Error("Invalid Credentials")
    }
    const user = userData.rows[0]

    const matchPassword = await bcrypt.compare(password, user.password)
    if (!matchPassword) {
        throw new Error("Invalid Credentials")
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }
    const token = jwt.sign(jwtPayload, config.secret as string, { expiresIn: "1d" })

    delete user.password
    return { token, user }
}

export const authService = {
    signUpUserIntoDB,
    logInUserIntoDB
}