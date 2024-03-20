import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUserFromDB = async (payload: {
  email: string;
  password: string;
}) => {
  console.log("user loged in...", payload);

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );

  const accessToken = jwt.sign(
    {
      id: userData.id,
      email: userData.email,
      role: userData.role,
    },
    "abcdefg",
    {
      algorithm: "HS256",
      expiresIn: "15m",
    }
  );

  console.log(accessToken);

  return userData;
};

export const AuthServices = {
  loginUserFromDB,
};
