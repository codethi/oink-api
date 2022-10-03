import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server running in port: ${port}`));
