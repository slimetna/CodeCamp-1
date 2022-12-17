import { Router } from 'express';

const route: any = Router();

import { getTag, createTag, deleteTag, addUserToTag, delUserToTag } from '../controllers/tags.controller';

route.get('/', async (req: any, res: any) => {
    await getTag(req, res);
});

route.get('/:id', async (req: any, res: any) => {
    await getTag(req, res);
});

route.post('/', async (req: any, res: any) => {
    await createTag(req, res);
});

route.delete('/:id', async (req: any, res: any) => {
    await deleteTag(req, res);
});

route.delete('/', async (req: any, res: any) => {
    await deleteTag(req, res);
});

route.post('/:id/users', async (req: any, res: any) => {
    await addUserToTag(req, res);
});

route.delete('/:id/users', async (req: any, res: any) => {
    await delUserToTag(req, res);
});

export default route;