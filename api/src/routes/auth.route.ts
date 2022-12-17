import { Router } from 'express';
import { login, checkAuth } from '../controllers/auth.controller';
const route: any = Router();

route.post('/', (req: any, res: any) => {
    login(req, res);
});

route.get('/', (req: any, res: any) => {
    checkAuth(req, res);
});

export default route;