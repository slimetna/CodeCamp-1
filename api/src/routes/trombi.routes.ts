import { Router } from 'express';
import { ById, trombi } from '../controllers/trombi.controller';

const route: any = Router();

route.get('/', (req: any, res: any) => {
    trombi(req, res);
});

route.get('/:id', (req: any, res: any) => {
    ById(req, res);
});


export default route;