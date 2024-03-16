import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./modules/User/user.routes";
import { AdminRouter } from "./modules/Admin/admin.routes";
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Ph health server",
  });
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", AdminRouter);

export default app;
