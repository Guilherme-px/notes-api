import { Request, Response } from 'express';
import { createNoteService } from '../services/CreateNoteService';
import { NotesRepository } from '../repositories/NotesRepository';

const createNoteController = async (req: Request, res: Response) => {
    const note = { ...req.body };

    const notesRepository = new NotesRepository();
    await createNoteService(note, notesRepository);
    return res.status(201).json({ message: 'Nota criada com sucesso!' });
};

export { createNoteController };
