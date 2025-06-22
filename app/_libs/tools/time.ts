import { DateTime } from 'luxon';

type FormatString =
  | 'yyyy-MM-ddTHH:mm:ss.SSSZ'
  | 'yyyy-MM-dd'
  | 'yyyy-MM-dd HH:mm:ss'
  | 'yyyyMMdd'
  | 'yyyy.MM.dd'
  | 'yyyy년 MM월 dd일'
  | 'HH:mm:ss'
  | 'HH:mm';

export class Time {
  public static now() {
    // 여기에 기본 세팅을 함.
    return DateTime
      .now()
      .setLocale('ko_KR')
      .setZone('Asia/Seoul');
  }

  public static toISO(date: DateTime = this.now()) {
    return date.toUTC().toISO();
  }

  public static toDate(date: DateTime = this.now()) {
    return date.toISODate();
  }

  public static toCompactDate(date: DateTime = this.now()) {
    return date.toFormat('yyyyMMdd');
  }

  public static format(format: FormatString, date: DateTime = this.now()) {
    return date.toFormat(format);
  }

  public static toRelative(date: DateTime = this.now()) {
    return date.toRelative();
  }
}
