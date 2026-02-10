import express from 'express'
import bodyParser from 'body-parser'
import env from 'dotenv'
import connectDB from './config/db.js'
import routes from "./routes/movie.routes.js";


connectDB()
env.config()
const app = express() // express app object
//configuring body parser
app.use(bodyParser.urlencoded({extended: true
}))
app.use(bodyParser.json())
routes(app);
app.listen(process.env.PORT,()=>{
    // this callback gets executed once we successfully start
    console.log(`Server is running on port ${process.env.PORT}`)
})
