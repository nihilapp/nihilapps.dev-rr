import { createErrorResponse, createResponse, supabase } from '@/_libs';

export const getUserByEmail = async (email: string) => {
  try {
    const { data, error, } = await supabase()
      .from('get_authors')
      .select('*')
      .eq('email', email);

    if (error) {
      return createErrorResponse({
        status: 500,
        message: `DB 조회 중 오류 발생: ${error.message}`,
      });
    }

    return createResponse({
      data,
      status: 200,
      message: '사용자 조회 성공',
    });
  }
  catch (error) {
    return createErrorResponse({
      status: 500,
      message: `서버 내부 처리 중 예외 발생: ${error instanceof Error ? error.message : String(error)}`,
    });
  }
};
