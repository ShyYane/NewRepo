import { Token } from "../modal/LoginModal";
import { RegisterModal } from "../modal/RegisterModal";
import { GetRoleResponse } from "../modal/RoleModal";
import axiosInstance from "./Customize-Axios";
// localStorage.setItem(
//   "token",
//   "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJ0YW4iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTczMTk5OTY4NCwiaWF0IjoxNzMxOTEzMjg0LCJzY29wZSI6IlJPTEVfQURNSU4gREVMRVRFIFdBVENIIFVQREFURSBDUkVBVEUifQ.IsI8yni_MEskcOwct84gCSaIfyplaR7TaVH4Yu-gwcko9CxBCNKf3GET0_v4gHcelpGDoC8SzQE7tuCJeXlpMA"
// );

export const getRoleFromToken = async (): Promise<GetRoleResponse> => {
  try {
    const response = await axiosInstance.get<GetRoleResponse>(`/users/myinfo`
    //   , {
    //   headers: {
    //     ...getHeader(),
    //   },
    // }
  );
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};
export const loginApi = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post<Token>(`/auth/token`, {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error("Error posting:", error);
    throw error;
  }
};
export const registerApi = async (
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  dob: string,
  roles: string[]
) => {
  try {
    const response = await axiosInstance.post<RegisterModal>(`/users`, {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      roles: roles,
    });
    return response.data;
  } catch (error) {
    console.error("Error posting:", error);
    throw error;
  }
};
