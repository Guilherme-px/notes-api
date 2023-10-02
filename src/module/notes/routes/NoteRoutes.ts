import { Router } from 'express';
import { createNoteController } from '../controllers/CreateNoteController';

const routes = Router();

routes.post('/', createNoteController);

export default routes;
