import { createErrorResponse, createResponse, db } from '@/_libs';

export async function deleteUser(id: string) {
  try {
    // 사용자가 존재하는지 찾아보기.
    const findUser = await db.users.getById(id);

    // 사용자가 존재하지 않으면 에러 반환.
    if (findUser.status === 404) {
      return createErrorResponse({
        ...findUser,
      });
    }

    // 사용자 삭제.
    const result = await db.users.deleteUser(id);

    // 사용자 삭제 성공 반환.
    return createResponse({
      ...result,
    });
  }
  catch (error) {
    console.error('유저 삭제 실패:', error);

    return createErrorResponse({
      status: 500,
      message: '서버 오류: 유저를 삭제하는 중 문제가 발생했습니다.',
    });
  }
}
