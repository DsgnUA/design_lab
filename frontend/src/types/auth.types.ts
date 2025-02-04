export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  subscription: string;
  orderReference: string;
  substart: Date;
  subend: Date;
  createdAt: string;
}

export interface UserList {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subscription: string;
  orderReference: string;
  substart: Date;
  subend: Date;
  createdAt: string;
}

export interface GetUser {
  token: string;
  user: UserProfile;
}

export interface UserRegProfile {
  name: string;
  email: string;
  password: string;
}

export interface UserLogProfile {
  email: string;
  password: string;
}

export interface UserForgotProfile {
  email: string;
}

export interface UserNewPassProfile {
  newPassToken: string;
  password: string;
}

export interface UserChangePassProfile {
  oldPassword: string;
  newPassword: string;
}
