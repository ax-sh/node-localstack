import express  from 'express'
import * as dotenv from "dotenv";
dotenv.config();


const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    debugger
    res.send('Hello Index!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})