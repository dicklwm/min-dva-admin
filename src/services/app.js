/** Created by Min on 2017-01-14.  */

import { index, makeService } from '../utils/api';

export const login = makeService(index.login, 'POST');
export const logout = makeService(index.logout, 'POST');
