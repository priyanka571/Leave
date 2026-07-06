import User from "@/models/User";

export const createUser = async (data: any) => {
  return await User.create(data);
};

export const getUsers = async () => {
  return await User.find();
};