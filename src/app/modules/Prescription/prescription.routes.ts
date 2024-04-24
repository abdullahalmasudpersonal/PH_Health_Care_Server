import express from "express";
import auth from "../../middlewares/auth";
import { PrescriptionController } from "./prescription.controller";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.DOCTOR),
  PrescriptionController.createPrescription
);

export const PrescriptionRouter = router;
