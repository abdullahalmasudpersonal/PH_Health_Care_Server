import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service";
import { adminFilterableFields } from "./admin.constant";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const getAllAdmin = async (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.query);
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    console.log(options);
    const result = await adminService.getAllAdminFromDB(filters, options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data fetched!",
      meta: result.mata,
      data: result.data,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await adminService.getSingleAdminFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Get single Admin data fetched!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateSingleAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await adminService.updateSingleAdminIntoDB(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Admin data Updated!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteSingleAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await adminService.deleteSingleAdminIntoDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Admin deleted!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const softDeleteSingleAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await adminService.softDeleteSingleAdminIntoDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Soft Single Admin deleted!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  updateSingleAdmin,
  deleteSingleAdmin,
  softDeleteSingleAdmin,
};
