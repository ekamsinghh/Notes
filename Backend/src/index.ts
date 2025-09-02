import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db_config";
import apiRoutes from "./routes/index";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", apiRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server Configured Successfully");
});

app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
  connectDB();
});
