import { Router } from 'express';
import { createNoteController } from '../controllers/CreateNoteController';
import { getAllNotesController } from '../controllers/GetAllNotesController';

const routes = Router();

routes.post('/', createNoteController);
routes.get('/', getAllNotesController);

export default routes;
