import { Bcrypt } from '@/_libs/tools/bcrypt';

import { Common } from './common';
import { Cookie } from './cookie';

export interface Tools {
  common: Common;
  bcrypt: Bcrypt;
  cookie: Cookie;
}

export const tools: Tools = {
  common: new Common(),
  bcrypt: new Bcrypt(),
  cookie: new Cookie(),
};
