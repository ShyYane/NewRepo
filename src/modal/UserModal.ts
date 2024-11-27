import { Role } from "./RoleModal";

export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  dob: string;
  roles: Role[];
};

export type getAllUserType = {
  code: number;
  result: User[];
};
export type getUserByIdType = {
  code: number;
  result: User;
};

export type UserUpdate = {
  firstName: string;
  lastName: string;
  dob: string;
  roles: Role[];
};

export type UserUpdateType = {
  code: number;
  result: User[];
};