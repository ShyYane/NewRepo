export type Role = {
  name: string;
  description: string;
  permissions: {
    name: string;
    description: string;
  }[];
};

type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  dob: string;
  roles: Role[];
};

export type GetRoleResponse = {
  code: number;
  result: User;
};
export type GetAllRole = {
  code: number;
  result: Role[];
};
type createRole = {
  name: string,
  description: string,
  permissions: string[]
};
export type createRoleType = {
  code: number;
  result: createRole;
};