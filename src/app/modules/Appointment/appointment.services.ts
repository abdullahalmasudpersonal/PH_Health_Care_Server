import prisma from "../../../shared/prisma";
import { v4 as uuidv4 } from "uuid";

const creaeAppointmentIntoDB = async (payload: any, user: any) => {
  const today = new Date();
  const transactionId: string =
    "PH-HealthCare-" +
    today.getFullYear() +
    "-" +
    today.getMonth() +
    "-" +
    today.getDay() +
    "-" +
    today.getHours() +
    "-" +
    today.getMinutes();

  console.log(today, transactionId);

  const patientData = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      id: payload.doctorId,
    },
  });

  await prisma.doctorSchedule.findFirstOrThrow({
    where: {
      doctorId: doctorData.id,
      scheduleId: payload.scheduleId,
      isBooked: false,
    },
  });

  const videoCallingId: string = uuidv4();

  const result = await prisma.$transaction(async (tx) => {
    const appoinemtData = await tx.appointment.create({
      data: {
        patientId: patientData.id,
        doctorId: doctorData.id,
        scheduleId: payload.scheduleId,
        videoCallingId,
      },
      include: {
        patient: true,
        doctor: true,
        schedule: true,
      },
    });

    await tx.doctorSchedule.update({
      where: {
        doctorId_scheduleId: {
          doctorId: doctorData.id,
          scheduleId: payload.scheduleId,
        },
      },
      data: {
        isBooked: true,
        appointmentId: appoinemtData.id,
      },
    });

    const today = new Date();
    const transactionId: string =
      "PH-HealthCare-" +
      today.getFullYear() +
      "-" +
      today.getMonth() +
      "-" +
      today.getDay() +
      "-" +
      today.getHours() +
      "-" +
      today.getMinutes();
    console.log(transactionId);

    await tx.payment.create({
      data: {
        appointmentId: appoinemtData.id,
        amount: doctorData.appointmentFee,
        transactionId,
      },
    });

    return appoinemtData;
  });

  return result;
};

export const AppointmentServices = {
  creaeAppointmentIntoDB,
};
