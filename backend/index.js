//steps:

//nmp init
//npm i express mongoose jsonwebtoken dotenv cors cookie-parser nodemon bcryptjs
//"type": "module" -> in package.json , use this line to use import and export
//make index.js
//make express app
//write middlewares
//"dev": "nodemon index.js" -> in scripts of package.json, use this to run project
//start app by npm run dev

//setup mongodb
//go to mogodb.com , new project, create, create, create deployment, create database user, choose connection, mongodb for vs code, copy, then newtwork access, add ip address, allow across from anywhere, confirm
//make .env and paste MONGO_URI=...
//import dotenv and line dotenv.config({});
//make db.js and connect mongo

//create models
//create controllers
//create routes
//create middlewares


import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.routes.js"
import jobRoute from "./routes/job.routes.js"
import applicationRoute from "./routes/application.routes.js"

dotenv.config({});

const app = express();

//required middleware in every backend project

app.use(express.json()); 
//This middleware parses incoming requests with JSON payloads.
// e.g., { "name": "kamlesh" }), you can access it like this:
// console.log(req.body.name); 

app.use(express.urlencoded({extended: true})); 
//Parses incoming form data (from HTML form submissions).
//Allows Express to read data submitted through HTML forms (application/x-www-form-urlencoded content type).
//With extended: true, it can parse nested objects.

app.use(cookieParser());
//Middleware that parses cookies sent by the client.

const corsOptions = {
    origin: 'http://localhost:5173',
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}
app.use(cors(corsOptions));
//Applies CORS rules globally to the Express app.
//This tells your backend to accept requests from your frontend (like localhost:5173) and also allow credentials (cookies, etc.).

const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute)
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, ()=> {
    connectDB();
    console.log(`app is listenning at ${PORT}`);
})