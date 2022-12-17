import { Router } from 'express';
import { getLastMelee } from '../controllers/lastMelee.controller';
const route: any = Router();

route.get('/:id', async (req: any, res: any) => {
    await getLastMelee(req, res);
});

export default route;