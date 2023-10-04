import { Router } from 'express';
import { createNoteController } from '../controllers/CreateNoteController';
import { getAllNotesController } from '../controllers/GetAllNotesController';
import { getNoteByIdController } from '../controllers/GetNoteByIdController';
import { updateNoteController } from '../controllers/UpdateNoteController';

const routes = Router();

routes.post('/', createNoteController);
routes.get('/', getAllNotesController);
routes.get('/:id', getNoteByIdController);
routes.put('/:id', updateNoteController);

export default routes;
