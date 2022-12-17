import { Router } from 'express';
const route: any = Router();

import index from './routes/index.route';
import auth from './routes/auth.route';
import trombi  from './routes/trombi.routes';
import melee from './routes/melee.route';
import users from './routes/users.route';
import tags from './routes/tags.route';
import lastMelee from './routes/lastMelee.route';

route.use('/', index);
route.use('/auth', auth);
route.use('/melee', melee);
route.use('/trombi', trombi);
route.use('/users', users);
route.use('/tags', tags);
route.use('/lastMelee', lastMelee);

export default route;