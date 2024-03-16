import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllAdminFromDB = async (parms: any) => {
  const { searchTerm, ...filterData } = parms;
  const andCondition: Prisma.AdminWhereInput[] = [];
  const adminSearchAbleFields = ["name", "email"];

  console.log(filterData);

  if (parms.searchTerm) {
    andCondition.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: parms.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.AdminWhereInput = { AND: andCondition };

  const result = await prisma.admin.findMany({
    where: whereConditions,
  });
  return result;
};

export const adminService = {
  getAllAdminFromDB,
};
