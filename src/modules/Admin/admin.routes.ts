import express, { Request, Response } from "express";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.get("/", AdminController.getAllAdmin);

export const AdminRouter = router;
