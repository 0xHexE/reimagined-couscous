import * as Parse from 'parse';

export class CacheTranslate extends Parse.Object {
  constructor() {
    super('cacheTranslate');
  }

  key: string;
  value: string;
}
