import { AppointmentStatus, PaymentStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IAuthUser } from "../../interfaces/common";

const createPrescriptionIntoDB = async (user: IAuthUser, payload: any) => {
  const appointmentData = await prisma.appointment.findFirstOrThrow({
    where: {
      id: payload.appointmentId,
      status: AppointmentStatus.COMPLETED,
      paymentStatus: PaymentStatus.PAID,
    },
  });
  console.log(user, appointmentData);
};

export const PrescriptionServices = {
  createPrescriptionIntoDB,
};
