import {
  createPermissionType,
  getAllPermission,
} from "../modal/PermissionModal";
import axiosInstance from "./Customize-Axios";

export const getAllPermissions = async () => {
  try {
    const response = await axiosInstance.get<getAllPermission>(`/permissions`);
    return response.data.result;
  } catch (error) {
    console.error("Error get:", error);
    throw error;
  }
};

export const createPermission = async (name: string, description: string) => {
  try {
    const response = await axiosInstance.post<createPermissionType>(
      `/permissions`,
      {
        name: name,
        description: description,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error posting:", error);
    throw error;
  }
};
