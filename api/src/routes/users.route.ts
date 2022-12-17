import { Router } from 'express';
import { getAllstudents, getStudentById } from '../controllers/users.controller';

const route: any = Router();

route.get('/', async (req: any, res: any) => {
    await getAllstudents(req, res)
});

route.get('/:id', async (req: any, res: any) => {
    await getStudentById(req, res)
});

export default route;