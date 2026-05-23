import express, { type Application, type Request, type Response } from "express"
import cors from "cors"
import { authRoute } from "./module/auth/auth.route"
import { issuesRoute } from "./module/issues/issues.route"
import globalErrorHandler from "./middleware/globalErrorHandler"
const app: Application = express()

app.use(express.json())
app.use(cors({
  origin: 'https://b7-a2-five.vercel.app'
}))

app.get("/", (req: Request, res: Response) => {
    res.send({
        success: true,
        message: "The server is running"
    })
})

app.use("/api/auth", authRoute)
app.use("/api/issues", issuesRoute)


// Global Error Handling Middleware
app.use(globalErrorHandler);

export default app