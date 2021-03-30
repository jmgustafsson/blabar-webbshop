/*eslint-disable*/
import express from "express";
import cors from "cors";
import Router from "./routes/routes.js";
// const  userRouter = require("./routes/user-routes.js");
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());



// app.use('/api', userRouter);

app.use(Router);



app.listen(5000, () => console.log("Server running on port 5000"));
