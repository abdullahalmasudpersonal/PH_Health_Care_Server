import express, { Request, Response } from "express";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.get("/", AdminController.getAllAdmin);

router.get("/:id", AdminController.getSingleAdmin);

router.patch("/:id", AdminController.updateSingleAdmin);

router.delete("/:id", AdminController.deleteSingleAdmin);

export const AdminRouter = router;
