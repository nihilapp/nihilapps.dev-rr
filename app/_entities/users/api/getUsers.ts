import { createErrorResponse, createResponse, supabase } from '@/_libs';

export const getUsers = async () => {
  try {
    const { data, error, } = await supabase()
      .from('get_authors')
      .select('*');

    if (error) {
      // 쿼리(통신/DB) 에러
      return createErrorResponse({
        status: 500,
        message: `DB 조회 중 오류 발생: ${error.message}`,
      });
    }

    return createResponse({
      data,
      status: 200,
      message: '사용자 목록 조회 성공',
    });
  }
  catch (error) {
    // 코드 실행 중 예외
    return createErrorResponse({
      status: 500,
      message: `서버 내부 처리 중 예외 발생: ${error instanceof Error ? error.message : String(error)}`,
    });
  }
};
