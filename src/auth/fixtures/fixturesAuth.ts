import { IUserCreate, IUserStructure } from "../userTypes.js";

export const isaNewUser: IUserCreate = {
  email: "isasaete@gmail.com",
  password: "abcabcd1",
  name: "Isabel",
};

export const isaUserRegistered: IUserStructure = {
  _id: "123456789012345678901234",
  email: "isasaete@gmail.com",
  password: "abcabcd1",
  name: "Isabel",
};

export const diegoUserData: IUserCreate = {
  email: "diego@gmail.com",
  password: "1234567",
  name: "Diego",
};
