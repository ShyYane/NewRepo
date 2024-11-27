import { createRoleType, GetAllRole } from "../modal/RoleModal";
import axiosInstance from "./Customize-Axios";

export const getAllRole = async () => {
  try {
    const response = await axiosInstance.get<GetAllRole>(`/roles`);
    return response.data.result;
  } catch (error) {
    console.error("Error get:", error);
    throw error;
  }
};
export const createRole = async (
    name: string,
    description: string,
    permissions: string[]
  ) => {
    try {
      const response = await axiosInstance.post<createRoleType>(`/roles`, {
        name: name,
        description: description,
        permissions: permissions
      });
      return response.data;
    } catch (error) {
      console.error("Error posting:", error);
      throw error;
    }
  };
  