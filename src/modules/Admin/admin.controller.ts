import { Request, Response } from "express";
import { adminService } from "./admin.service";
import pick from "../../shared/pick";
import { adminFilterableFields } from "./admin.constant";

const getAllAdmin = async (req: Request, res: Response) => {
  // console.log(req.query);
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    console.log(options);
    const result = await adminService.getAllAdminFromDB(filters, options);
    res.status(200).json({
      success: true,
      message: "Admin data fetched!",
      meta: result.mata,
      data: result.data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something sent wrong",
      err: err,
    });
  }
};

const getSingleAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminService.getSingleAdminFromDB(id);

    res.status(200).json({
      success: true,
      message: "Get single Admin data fetched!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something sent wrong",
      err: err,
    });
  }
};

const updateSingleAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminService.updateSingleAdminIntoDB(id, req.body);

    res.status(200).json({
      success: true,
      message: "Single Admin data Updated!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something sent wrong",
      err: err,
    });
  }
};

const deleteSingleAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminService.deleteSingleAdminIntoDB(id);

    res.status(200).json({
      success: true,
      message: "Single Admin deleted!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something sent wrong",
      err: err,
    });
  }
};

export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  updateSingleAdmin,
  deleteSingleAdmin,
};
