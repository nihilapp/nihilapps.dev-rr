import { createErrorResponse, createResponse, db } from '@/_libs';

export async function getUserById(id: string) {
  try {
    // 아이디로 유저 조회.
    const user = await db.users.getById(id);

    // 유저가 존재하지 않으면 에러 반환.
    if (user.status === 404) {
      return createErrorResponse({
        ...user,
      });
    }

    // 유저 조회 성공 반환.
    return createResponse({
      ...user,
    });
  }
  catch (error) {
    console.error('유저 조회 실패:', error);

    return createErrorResponse({
      status: 500,
      message: '서버 오류: 유저를 조회하는 중 문제가 발생했습니다.',
    });
  }
}
