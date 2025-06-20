import { Bcrypt } from '@/_libs/tools/bcrypt';

import { Calendar } from './calendar';
import { Common } from './common';
import { Cookie } from './cookie';

export interface Tools {
  common: Common;
  calendar: Calendar;
  bcrypt: Bcrypt;
  cookie: Cookie;
}

export const tools: Tools = {
  common: new Common(),
  calendar: new Calendar(),
  bcrypt: new Bcrypt(),
  cookie: new Cookie(),
};
