import type { UpdateUserPassword } from '@/_entities/users/users.types';
import { createErrorResponse, createResponse, db, tools } from '@/_libs';

export async function updateUserPassword(id: string, data: UpdateUserPassword) {
  try {
    const { currentPassword, newPassword, } = data;

    // 유저가 존재하는지 찾아보기.
    const findUser = await db.users.getUserWithAuth(id);

    // 유저가 존재하지 않으면 에러 반환.
    if (findUser.status === 404) {
      return createErrorResponse({
        ...findUser,
      });
    }

    // 입력한 비밀번호가 저장된 비밀번호와 같은지 점검.
    const isPasswordCorrect = await tools.bcrypt.dataCompare(
      findUser.data!.user_auths!.hashed_password!,
      currentPassword
    );

    // 입력한 비밀번호가 저장된 비밀번호와 다르면 에러 반환.
    if (!isPasswordCorrect) {
      return createErrorResponse({
        status: 401,
        message: '비밀번호가 일치하지 않습니다.',
      });
    }

    // 비밀번호 해싱.
    const hashedPassword = await tools.bcrypt.dataToHash(newPassword);

    // 비밀번호 수정.
    const user = await db.users.updateUserPassword(id, hashedPassword);

    // 비밀번호 수정 성공 반환.
    return createResponse({
      ...user,
    });
  }
  catch (error) {
    console.error('유저 비밀번호 수정 실패:', error);

    return createErrorResponse({
      status: 500,
      message: '서버 오류: 유저 비밀번호를 수정하는 중 문제가 발생했습니다.',
    });
  }
}