type userprofile = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  dob: string;
  role: string[];
};
export type RegisterModal = {
  code: number;
  result: userprofile;
};
