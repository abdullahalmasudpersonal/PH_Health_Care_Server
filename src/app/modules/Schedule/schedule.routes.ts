import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { ScheduleController } from "./schedule.controller";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  ScheduleController.createSchedule
);
router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  ScheduleController.getAllSchedule
);

export const ScheduleRoutes = router;