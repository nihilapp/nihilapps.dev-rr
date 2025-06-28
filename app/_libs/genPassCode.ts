/**
 * Web Crypto API를 사용하여 암호학적으로 안전한 랜덤 패스코드를 생성합니다.
 * 이 방식은 보안이 중요한 컨텍스트에 적합한 높은 수준의 무작위성을 보장합니다.
 *
 * '모듈로 편향(Modulo Bias)'을 피하기 위해, 문자셋 크기의 배수가 되는 범위 내의
 * 난수 값만을 사용합니다. 이를 통해 각 문자가 선택될 확률을 동일하게 만듭니다.
 *
 * @param {number} [length=40] - 생성할 패스코드의 길이.
 * @returns {string} 생성된 패스코드.
 * @throws {Error} 현재 환경에서 Crypto API를 사용할 수 없는 경우 에러를 발생시킵니다.
 */
export const genPassCode = (length: number = 40): string => {
  // 브라우저와 Node.js 환경 모두에서 crypto API를 안전하게 참조합니다.
  const crypto = globalThis.crypto;

  // crypto API를 사용할 수 없는 환경(예: 구형 브라우저, 일부 서버 환경)에 대한 예외 처리.
  if (!crypto) {
    throw new Error(
      'Crypto API를 사용할 수 없습니다. 이 환경에서는 안전한 난수 값을 생성할 수 없습니다.'
    );
  }

  // 패스코드에 사용할 문자들 (영문 대/소문자 + 숫자).
  const chars
    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charsLength = chars.length; // 62

  let result = '';
  // 생성된 패스코드의 길이가 요청된 길이가 될 때까지 반복합니다.
  while (result.length < length) {
    // 필요한 길이만큼의 랜덤 바이트를 담을 배열을 생성합니다.
    const buffer = new Uint8Array(length);
    // 암호학적으로 안전한 난수로 배열을 채웁니다. 각 요소는 0-255 사이의 값을 가집니다.
    crypto.getRandomValues(buffer);

    // 버퍼의 각 바이트를 순회하며 패스코드를 생성합니다.
    for (let i = 0; i < buffer.length && result.length < length; i++) {
      const randomByte = buffer[i]; // 0-255 사이의 랜덤 값.

      // 모듈로 편향을 제거하기 위한 임계값 계산.
      // 256을 62로 나눈 몫(4)에 62를 곱하여, 256보다 작은 62의 가장 큰 배수를 찾습니다. (결과: 248)
      const threshold = Math.floor(256 / charsLength) * charsLength;

      // 생성된 난수가 임계값(248)보다 작은 경우에만 사용합니다.
      // 248 이상의 값(248~255)은 버려져 편향을 제거합니다.
      if (randomByte < threshold) {
        // 편향이 제거된 난수를 사용하여 안전하게 문자를 선택하고 결과에 추가합니다.
        result += chars.charAt(randomByte % charsLength);
      }
    }
  }

  return result;
};
