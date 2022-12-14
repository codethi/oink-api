import express from "express";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";

import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRoute);
app.use("/post", postRoute);

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server running in port: ${port}`));
