import express, { NextFunction, Request, Response } from "express";
import { AdminController } from "./admin.controller";
import { AnyZodObject, z } from "zod";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidationSchemas } from "./admin.validations";

const router = express.Router();

router.get("/", AdminController.getAllAdmin);

router.get("/:id", AdminController.getSingleAdmin);

router.patch(
  "/:id",
  validateRequest(adminValidationSchemas.update),
  AdminController.updateSingleAdmin
);

router.delete("/:id", AdminController.deleteSingleAdmin);

router.delete("/soft/:id", AdminController.softDeleteSingleAdmin);

export const AdminRoutes = router;
