import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { PrescriptionServices } from "./prescription.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IAuthUser } from "../../interfaces/common";
import pick from "../../../shared/pick";

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
      message: "Create prescription successfully",
      data: result,
    });
  }
);

const getMyPrescription = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const user = req.user;
    const result = await PrescriptionServices.getMyPrescriptionIntoDB(
      user as IAuthUser,
      options
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Get my prescription successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

export const PrescriptionController = {
  createPrescription,
  getMyPrescription,
};
