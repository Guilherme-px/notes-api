import { Router } from 'express';
import { createNoteController } from '../controllers/CreateNoteController';
import { getAllNotesController } from '../controllers/GetAllNotesController';
import { getNoteByIdController } from '../controllers/GetNoteByIdController';

const routes = Router();

routes.post('/', createNoteController);
routes.get('/', getAllNotesController);
routes.get('/:id', getNoteByIdController);

export default routes;
