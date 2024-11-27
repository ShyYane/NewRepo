export type Permission = {
  name: string;
  description: string;
};
export type getAllPermission = {
  code: number;
  result: Permission[];
};

type createPermission = {
  name: string;
  description: string;
};
export type createPermissionType = {
  code: number;
  result: createPermission;
};
