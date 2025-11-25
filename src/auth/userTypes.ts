export interface IUserStructure {
  _id: string;
  email: string;
  password: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserCreate {
  email: string;
  password: string;
  name: string;
}

export interface ResponsBodyError {
  error: string;
}
