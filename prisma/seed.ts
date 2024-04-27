import { UserRole } from "@prisma/client";
import prisma from "../src/shared/prisma";
import * as bcrypt from "bcrypt";

const seedSuperAdmin = async () => {
  try {
    const isExistSuperAdmin = await prisma.user.findFirst({
      where: {
        role: UserRole.SUPER_ADMIN,
      },
    });

    if (isExistSuperAdmin) {
      console.log("Super admin alrady exists");
      return;
    }

    const hashedPassword: string = await bcrypt.hash("12345", 12);

    const superAdminData = await prisma.user.create({
      data: {
        email: "superadmin@gmail.com",
        password: hashedPassword,
        role: UserRole.SUPER_ADMIN,
        admin: {
          create: {
            name: "Super admin",
            //email:"superadmin@gmail.com",
            contactNumber: "01726457771",
          },
        },
      },
    });

    console.log("super admin created successfully", superAdminData);
  } catch (err) {
    ///
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
};

seedSuperAdmin();
