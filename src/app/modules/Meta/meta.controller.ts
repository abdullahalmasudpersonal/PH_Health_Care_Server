import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { MetaServices } from "./meta.services";
import { IAuthUser } from "../../interfaces/common";

const fetchdeshbaordmetadata = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await MetaServices.fetchDeshboardMetaDataIntoDB(user as IAuthUser);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Get meta successfully",
      data: result,
    });
  }
);

export const MetaControllers = {
  fetchdeshbaordmetadata,
};
