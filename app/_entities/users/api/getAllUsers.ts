import { createErrorResponse, createResponse, db } from '@/_libs';

export async function getAllUsers() {
  try {
    // 모든 유저 조회.
    const users = await db.users.getAll();

    // 모든 유저 조회 성공 반환.
    return createResponse({
      ...users,
    });
  }
  catch (error) {
    console.error('유저 목록 조회 실패:', error);

    return createErrorResponse({
      status: 500,
      message: '서버 오류: 유저 목록을 조회하는 중 문제가 발생했습니다.',
    });
  }
}
