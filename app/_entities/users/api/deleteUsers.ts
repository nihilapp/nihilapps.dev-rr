import { createErrorResponse, createResponse, db } from '@/_libs';

export async function deleteUsers(ids: string[]) {
  try {
    // 다수 유저 삭제.
    const result = await db.users.deleteUsers(ids);

    // 다수 유저 삭제 성공 반환.
    return createResponse({
      ...result,
    });
  }
  catch (error) {
    console.error('다수 유저 삭제 실패:', error);

    return createErrorResponse({
      status: 500,
      message: '서버 오류: 여러 유저를 삭제하는 중 문제가 발생했습니다.',
    });
  }
}
