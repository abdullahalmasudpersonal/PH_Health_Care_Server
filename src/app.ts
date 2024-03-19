import express, {
  Application,
  NextFunction,
  request,
  Request,
  Response,
} from "express";
import cors from "cors";
import router from "./app/routes";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Ph health server",
  });
});

app.use("/api/v1", router);

/* app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.name || "Somthing went wrong!",
    error: err,
  });
}); */

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req);
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
