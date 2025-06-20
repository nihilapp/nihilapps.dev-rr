import type { CreateUser } from '@/_entities/users';
import { createErrorResponse, createResponse, db } from '@/_libs';
import { tools } from '@/_libs/tools';

export async function createUser(createUser: CreateUser) {
  try {
    const { password, userData, } = createUser;

    // 사용자가 존재하는지 찾아보기.
    const findUser = await db.users.getByEmail(userData.email);

    // 사용자가 존재하면 에러 반환.
    if (findUser.status === 200) {
      return createErrorResponse({
        status: 409,
        message: '이미 존재하는 이메일입니다.',
      });
    }

    // 사용자 생성.
    const user = await db.users.createUser(userData);

    // 비밀번호 해싱.
    const hashedPassword = await tools.bcrypt
      .dataToHash(password);

    // 사용자 인증 정보 생성.
    await db.users.createUserAuth(user.data.id, hashedPassword);

    // 사용자 생성 성공 반환.
    return createResponse({
      ...user,
    });
  }
  catch (error) {
    console.error('유저 생성 실패:', error);

    return createErrorResponse({
      status: 500,
      message: '서버 오류: 유저를 생성하는 중 문제가 발생했습니다.',
    });
  }
}
