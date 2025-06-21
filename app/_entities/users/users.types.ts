import type { InferSelectModel } from 'drizzle-orm';

import { userAuthTable } from './user-auths.table';
import { userTable, type userRoleEnum } from './users.table';

export type User = InferSelectModel<typeof userTable>;
export type UserAuth = InferSelectModel<typeof userAuthTable>;
export type UserRole = typeof userRoleEnum.enumValues[ number ];

export interface UserSession extends User {
  access_token: string;
}

export interface CreateUser {
  userData: CreateUserData;
  password: string;
}

export interface CreateUserData {
  email: string;
  username: string;
  role: UserRole;
}

export interface UpdateUserData {
  email?: string;
  username?: string;
}

export interface UpdateUserPassword {
  currentPassword: string;
  newPassword: string;
}
