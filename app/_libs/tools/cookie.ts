import { createCookie } from 'react-router';

/**
 * React Router 7 일반 쿠키 관리 유틸리티 클래스
 * React Router 7 프레임워크 모드에 맞게 구현
 * Static 메서드로 직접 사용 가능
 */
export class Cookie {
  /**
   * 쿠키 생성 및 값 설정
   * @param name 쿠키 이름
   * @param value 저장할 값
   * @param expiresAt 만료 시간(초)
   * @returns 직렬화된 쿠키 문자열
   */
  public static async set(name: string, value: string, expiresAt: number): Promise<string> {
    const cookie = createCookie(name, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: expiresAt,
    });

    return await cookie.serialize(value);
  }

  /**
   * 쿠키 값 조회
   * @param name 쿠키 이름
   * @param cookieHeader 쿠키 헤더 문자열
   * @returns 파싱된 쿠키 값
   */
  public static async get<T>(name: string, cookieHeader: string | null): Promise<T | null> {
    if (!cookieHeader) {
      return null;
    }

    const cookie = createCookie(name);
    const value = await cookie.parse(cookieHeader);

    if (!value) {
      return null;
    }

    return value as T;
  }

  /**
   * 쿠키 삭제
   * @param name 쿠키 이름
   * @returns 만료된 쿠키 문자열
   */
  public static async remove(name: string): Promise<string> {
    const cookie = createCookie(name, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 0, // 즉시 만료
    });

    return await cookie.serialize('');
  }
}
