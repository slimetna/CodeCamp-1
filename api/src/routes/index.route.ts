import { Router } from 'express';
const route: any = Router();

route.get('/', (req: any, res: any) => {
    res.sendStatus(200);
});

export default route;