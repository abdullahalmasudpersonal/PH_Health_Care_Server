import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllAdminFromDB = async (parms: any) => {
  const andCondition: Prisma.AdminWhereInput[] = [];

  if (parms.searchTerm) {
    andCondition.push({
      OR: [
        {
          name: {
            contains: parms.searchTerm,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: parms.searchTerm,
            mode: "insensitive",
          },
        },
      ],
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
