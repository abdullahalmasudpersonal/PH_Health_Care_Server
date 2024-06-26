import { UserRole } from "@prisma/client";

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

/* export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
}; */

export type IAuthUser = {
  id: string;
  email: string;
  role: UserRole;
} | null;
