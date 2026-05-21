import express from "express"
import cors from "cors"
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.send({
        success: true,
        message: "The server is running"
    })
})

app.listen(port, ()=>{
    console.log(`app is running on port: ${port}`);
})