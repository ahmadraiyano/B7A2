import express, { type Application, type Request, type Response } from "express"
import cors from "cors"
import { authRoute } from "./module/auth/auth.route"
const app: Application = express()

app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }))

app.get("/", (req: Request, res: Response) => {
    res.send({
        success: true,
        message: "The server is running"
    })
})

app.use("/api/auth", authRoute)

export default app