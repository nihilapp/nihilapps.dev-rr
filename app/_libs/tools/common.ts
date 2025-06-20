import { v4 as uuid } from 'uuid';

export class Common {
  public uuid(key?: string) {
    if (key) {
      return `${key}-${uuid()}`;
    }

    return uuid();
  }

  public string<T>(data: T) {
    return JSON.stringify(data);
  }

  public parse<T>(stringData: string): T {
    return JSON.parse(stringData);
  }

  public undefinedRemover<T extends object>(data: T) {
    const copy = { ...data, };
    const keys = Object.keys(copy);

    keys.forEach((key) => {
      if (copy[key as keyof T] === undefined) {
        copy[key as keyof T] = '' as T[keyof T];
      }

      if (copy[key as keyof T] === null) {
        copy[key as keyof T] = '' as T[keyof T];
      }
    });

    return copy;
  }

  public arraySlice<T>(array: T[], number: number) {
    const result: T[][] = [];

    for (let i = 0; i < array.length; i += number) {
      result.push(array.slice(i, i + number));
    }

    return result;
  }
}
