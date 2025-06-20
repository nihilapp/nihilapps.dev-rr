import type { UpdateUserData } from '@/_entities/users/users.types';
import { createErrorResponse, createResponse, db } from '@/_libs';

export async function updateUser(id: string, updateUser: UpdateUserData) {
  try {
    // 유저가 존재하는지 찾아보기.
    const findUser = await db.users.getById(id);

    // 유저가 존재하지 않으면 에러 반환.
    if (findUser.status === 404) {
      return createErrorResponse({
        ...findUser,
      });
    }

    // 유저 정보 수정.
    const user = await db.users.updateUserData(id, updateUser);

    // 유저 정보 수정 성공 반환.
    return createResponse({
      ...user,
    });
  }
  catch (error) {
    console.error('유저 수정 실패:', error);

    return createErrorResponse({
      status: 500,
      message: '서버 오류: 유저 정보를 수정하는 중 문제가 발생했습니다.',
    });
  }
}
