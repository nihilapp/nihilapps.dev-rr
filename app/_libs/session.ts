import { createCookieSessionStorage } from 'react-router';

// 세션에 저장될 데이터의 타입을 정의합니다.
type SessionData = {
  passcode: string;
};

// 세션 에러 데이터의 타입을 정의합니다.
type SessionFlashData = {
  error: string;
};

// 쿠키 기반 세션 저장소를 생성합니다.
const session = createCookieSessionStorage<
  SessionData,
  SessionFlashData
>({
  cookie: {
    name: '__shield_session',
    httpOnly: true,
    maxAge: 60 * 5, // 5분
    path: '/',
    sameSite: 'lax',
    secrets: [ process.env.SESSION_SECRET || 'DEFAULT_SESSION_SECRET', ],
    secure: process.env.NODE_ENV === 'production',
  },
});

export const getSession = async (request: Request) => {
  return await session.getSession(request.headers.get('Cookie'));
};

export const { commitSession, destroySession, } = session;
