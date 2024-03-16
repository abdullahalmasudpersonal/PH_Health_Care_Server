import { Request, Response } from "express";
import { adminService } from "./admin.service";

const getAllAdmin = async (req: Request, res: Response) => {
  // console.log(req.query);
  try {
    const result = await adminService.getAllAdminFromDB(req.query);
    res.status(200).json({
      success: true,
      message: "Admin data fetched!",
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
};
