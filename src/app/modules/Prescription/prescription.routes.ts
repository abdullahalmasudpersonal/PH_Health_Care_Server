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

router.get(
  "/",
  auth(UserRole.PATIENT),
  PrescriptionController.getMyPrescription
);

export const PrescriptionRouter = router;
