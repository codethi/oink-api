import express from "express";
import { userRoute } from "./routes/user.route.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(userRoute);

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server running in port: ${port}`));
