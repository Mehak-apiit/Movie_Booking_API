import express from 'express'

import env from 'dotenv'
import connectDB from './config/db.js'
import routes from "./routes/movie.routes.js";
import theatreRoutes from './routes/theatre.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import bookingRoutes from './routes/booking.routes.js';


connectDB()
env.config()
const app = express() // express app object
app.use(express.json());
app.use(express.urlencoded({extended: true}))
//configuring body parser
//app.use(bodyParser.urlencoded({extended: true
//}))
//app.use(bodyParser.json())
routes(app);
theatreRoutes(app);
authRoutes(app);
userRoutes(app);
bookingRoutes(app);

app.listen(process.env.PORT,()=>{
    // this callback gets executed once we successfully start
    console.log(`Server is running on port ${process.env.PORT}`)
})
