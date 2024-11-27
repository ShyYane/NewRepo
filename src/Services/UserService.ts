import { getAllUserType, getUserByIdType, UserUpdateType } from "../modal/UserModal";
import axiosInstance from "./Customize-Axios";

export const getAllUser = async () => {
  try {
    const response = await axiosInstance.get<getAllUserType>(`/users`);
    return response.data.result;
  } catch (error) {
    console.error("Error get:", error);
    throw error;
  }
};
export const getUserById = async (id: string) => {
  try {
    const response = await axiosInstance.get<getUserByIdType>(`/users/${id}`);
    return response.data.result;
  } catch (error) {
    console.error("Error get:", error);
    throw error;
  }
};
export const updateUser = async (
  id: string,
  firstName: string,
  lastName: string,
  dob: string,
  roles: string[]
) => {
  try {
    const response = await axiosInstance.put<UserUpdateType>(`/users/${id}`, {
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      roles: roles
    });
    return response.data;
  } catch (error) {
    console.error("Error put:", error);
    throw error;
  }
};
