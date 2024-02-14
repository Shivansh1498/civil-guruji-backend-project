import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/dbConnect.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;
connectDB();

app.use("/api/user/", userRouter);

app.get("/", (_, res) => {
  res.send("Welcome to civil guruji demo project server");
});

app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`)
);
