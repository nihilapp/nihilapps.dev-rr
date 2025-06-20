import type { InferSelectModel } from 'drizzle-orm';

import { userTable, type userAuthTable, type userRole } from './users.table';

export type User = InferSelectModel<typeof userTable>;
export type UserAuth = InferSelectModel<typeof userAuthTable>;
export type UserRole = typeof userRole.enumValues[ number ];

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
