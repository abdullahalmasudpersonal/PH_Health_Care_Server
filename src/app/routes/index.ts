import express from "express";
import { UserRoutes } from "../modules/User/user.routes";
import { AdminRoutes } from "../modules/Admin/admin.routes";
import { AuthRouters } from "../modules/Auth/auth.routes";
import { SpecialtiesRouters } from "../modules/Specialties/specialties.routes";
import { DoctorRoutes } from "../modules/Doctor/doctor.router";
import { PatientRoutes } from "../modules/Patient/patient.route";
import { ScheduleRoutes } from "../modules/Schedule/schedule.routes";
import { DoctorScheduleRouters } from "../modules/DoctorSchedule/doctorSchedule.routes";
import { AppointmentRouters } from "../modules/Appointment/appointment.routes";
import { PaymentRoutes } from "../modules/Payment/payment.routes";
import { PrescriptionRouter } from "../modules/Prescription/prescription.routes";
import { ReviewRouters } from "../modules/Review/review.routes";
const router = express.Router();

const modulesRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route: AuthRouters,
  },
  {
    path: "/specialties",
    route: SpecialtiesRouters,
  },
  {
    path: "/doctor",
    route: DoctorRoutes,
  },
  {
    path: "/patient",
    route: PatientRoutes,
  },
  {
    path: "/schedule",
    route: ScheduleRoutes,
  },
  {
    path: "/doctor-schedule",
    route: DoctorScheduleRouters,
  },
  {
    path: "/appointment",
    route: AppointmentRouters,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
  {
    path: "/prescription",
    route: PrescriptionRouter,
  },
  {
    path: "/review",
    route: ReviewRouters,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
