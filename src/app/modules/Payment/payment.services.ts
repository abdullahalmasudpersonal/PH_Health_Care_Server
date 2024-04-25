import prisma from "../../../shared/prisma";
import { SSLService } from "../SSL/ssl.service";
import { PaymentStatus } from "@prisma/client";

const initPaymentIntoDB = async (appointmentId: string) => {
  const paymentData = await prisma.payment.findFirstOrThrow({
    include: {
      appointment: {
        include: {
          patient: true,
        },
      },
    },
  });

  const initPaymentData = {
    amount: paymentData.amount,
    transactionId: paymentData.transactionId,
    name: paymentData.appointment.patient.name,
    email: paymentData.appointment.patient.email,
    address: paymentData.appointment.patient.address,
    phoneNumber: paymentData.appointment.patient.contactNumber,
  };

  const result = await SSLService.initPayment(initPaymentData);
  return {
    paymentUrl: result.GatewayPageURL,
  };
};

const validatePaymentIntoDB = async (payload: any) => {
  ///
  /*   if (!payload || !payload.status || !(payload.status === "VALID")) {
    return {
      message: "Invalid payment!",
    };
  }

  const response = await SSLService.validatePayment(payload);

  if (response?.status !== "VALID") {
    return {
      message: "Payment Faield!",
    };
  } */

  const response = payload;

  await prisma.$transaction(async (tx) => {
    const updatedPaymentData = await tx.payment.update({
      where: {
        transactionId: response.tran_id,
      },
      data: {
        status: PaymentStatus.PAID,
        paymentGatewayData: response,
      },
    });

    await tx.appointment.update({
      where: {
        id: updatedPaymentData.appointmentId,
      },
      data: {
        paymentStatus: PaymentStatus.PAID,
      },
    });
  });

  return {
    message: "Payment success!",
  };
};

export const PaymentServices = {
  initPaymentIntoDB,
  validatePaymentIntoDB,
};