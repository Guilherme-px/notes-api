import { Router } from 'express';
import { createNoteController } from '../controllers/CreateNoteController';
import { getAllNotesController } from '../controllers/GetAllNotesController';
import { getNoteByIdController } from '../controllers/GetNoteByIdController';
import { updateNoteController } from '../controllers/UpdateNoteController';
import { deleteNoteController } from '../controllers/DeleteNoteController';

const routes = Router();

routes.post('/', createNoteController);
routes.get('/', getAllNotesController);
routes.get('/:id', getNoteByIdController);
routes.put('/:id', updateNoteController);
routes.delete('/:id', deleteNoteController);

export default routes;
