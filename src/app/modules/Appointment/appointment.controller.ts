import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { AppointmentServices } from "./appointment.services";
import { IAuthUser } from "../../interfaces/common";

const creaeAppointment = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await AppointmentServices.creaeAppointmentIntoDB(
      req.body,
      user as IAuthUser
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Create appointment successfully",
      data: result,
    });
  }
);

export const AppointmentController = {
  creaeAppointment,
};
