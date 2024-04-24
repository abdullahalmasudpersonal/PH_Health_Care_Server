import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { PrescriptionServices } from "./prescription.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IAuthUser } from "../../interfaces/common";

const createPrescription = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await PrescriptionServices.createPrescriptionIntoDB(
      user as IAuthUser,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Update appointment status successfully",
      data: result,
    });
  }
);

export const PrescriptionController = {
  createPrescription,
};
