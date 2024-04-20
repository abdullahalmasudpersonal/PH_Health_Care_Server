import { Router } from "express";
import { AppointmentController } from "./appointment.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
  "/",
  auth(UserRole.PATIENT),
  AppointmentController.creaeAppointment
);

export const AppointmentRouters = router;
