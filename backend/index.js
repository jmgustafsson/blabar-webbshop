import express from "express";
import cors from "cors";
import Router from "./routes/routes.js";

const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


app.use(Router);

const router = require('./routes/routes.js');
app.use('/api', router);


app.listen(5000, () => console.log("Server running on port 5000"));