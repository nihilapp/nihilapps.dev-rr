import { eq, inArray } from 'drizzle-orm';

import type { ApiError, ApiResponse } from '@/_entities/common';
import { type CreateUserData, type UpdateUserData, type User, type UserRole } from '@/_entities/users';
import { userAuthTable, userTable } from '@/_entities/users/users.table';
import { db } from '@/_libs';

export class UserDB {
  static async getAll() {
    const users = await db.client
      .select()
      .from(userTable);

    return {
      status: 200,
      message: '사용자 목록 조회 성공.',
      data: users,
    } as ApiResponse<User[]>;
  }

  static async getById(id: string) {
    const [ user, ] = await db.client
      .select()
      .from(userTable)
      .where(eq(userTable.id, id));

    if (!user) {
      return {
        status: 404,
        message: '사용자 찾을 수 없음.',
      } as ApiError;
    }

    return {
      status: 200,
      message: '사용자 조회 성공.',
      data: user,
    } as ApiResponse<User>;
  }

  static async getByEmail(email: string) {
    const [ user, ] = await db.client
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (!user) {
      return {
        status: 404,
        message: '사용자 찾을 수 없음.',
      } as ApiError;
    }

    return {
      status: 200,
      message: '사용자 조회 성공.',
      data: user,
    } as ApiResponse<User>;
  }

  static async getUserWithAuth(id: string) {
    const [ user, ] = await db.client
      .select()
      .from(userTable)
      .leftJoin(userAuthTable, eq(userTable.id, userAuthTable.user_id))
      .where(eq(userTable.id, id));

    if (!user) {
      return {
        status: 404,
        message: '사용자 찾을 수 없음.',
      } as ApiError;
    }

    return {
      status: 200,
      message: '사용자 조회 성공.',
      data: user,
    } as ApiResponse<typeof user>;
  }

  static async createUser(data: CreateUserData) {
    const [ user, ] = await db.client
      .insert(userTable)
      .values(data)
      .returning();

    return {
      status: 201,
      message: '사용자 생성 성공.',
      data: user,
    } as ApiResponse<User>;
  }

  static async createUserAuth(id: string, hashed_password: string) {
    await db.client
      .insert(userAuthTable)
      .values({
        user_id: id,
        hashed_password,
      })
      .returning();

    return {
      status: 201,
      message: '사용자 인증 생성 성공.',
      data: null,
    } as ApiResponse<null>;
  }

  static async updateUserData(id: string, data: UpdateUserData) {
    const [ user, ] = await db.client
      .update(userTable)
      .set(data)
      .where(eq(userTable.id, id))
      .returning();

    return {
      status: 200,
      message: '사용자 데이터 수정 성공.',
      data: user,
    } as ApiResponse<User>;
  }

  static async updateUserPassword(id: string, newPassword: string) {
    await db.client
      .update(userAuthTable)
      .set({
        hashed_password: newPassword,
      })
      .where(eq(userAuthTable.user_id, id))
      .returning();

    return {
      status: 200,
      message: '사용자 비밀번호 수정 성공.',
      data: null,
    } as ApiResponse<null>;
  }

  static async updateUserImage(id: string, image: string) {
    const [ user, ] = await db.client
      .update(userTable)
      .set({
        image,
      })
      .where(eq(userTable.id, id))
      .returning();

    return {
      status: 200,
      message: '사용자 이미지 수정 성공.',
      data: user,
    } as ApiResponse<User>;
  }

  static async updateUserRole(id: string, role: UserRole) {
    const [ user, ] = await db.client
      .update(userTable)
      .set({
        role,
      })
      .where(eq(userTable.id, id))
      .returning();

    return {
      status: 200,
      message: '사용자 역할 수정 성공.',
      data: user,
    } as ApiResponse<User>;
  }

  static async updateUserActive(id: string, is_active: boolean) {
    const [ user, ] = await db.client
      .update(userTable)
      .set({
        is_active,
      })
      .where(eq(userTable.id, id))
      .returning();

    return {
      status: 200,
      message: '사용자 상태 수정 성공.',
      data: user,
    } as ApiResponse<User>;
  }

  static async deleteUser(id: string) {
    await db.client
      .delete(userTable)
      .where(eq(userTable.id, id));

    return {
      status: 204,
      message: '사용자 삭제 성공.',
      data: null,
    } as ApiResponse<null>;
  }

  static async deleteUsers(ids: string[]) {
    const result = await db.client
      .delete(userTable)
      .where(inArray(userTable.id, ids));

    return {
      status: 204,
      message: '사용자 삭제 성공.',
      data: result.count,
    } as ApiResponse<number>;
  }
}
