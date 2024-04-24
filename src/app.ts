import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";
import { AppointmentServices } from "./app/modules/Appointment/appointment.services";
import cron from "node-cron";
const app: Application = express();
app.use(cors());
app.use(cookieParser());

/// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

cron.schedule("* * * * *", () => {
  try {
    AppointmentServices.cancelUnpaidAppointment();
  } catch (err) {
    console.log(err);
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Ph health server",
  });
});

app.use("/api/v1", router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND",
    error: {
      path: req.originalUrl,
      message: "your requested path is not found !",
    },
  });
});

export default app;
