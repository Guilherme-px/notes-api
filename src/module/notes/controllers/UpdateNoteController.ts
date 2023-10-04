import { NextFunction, Request, Response } from 'express';
import { NotesRepository } from '../repositories/NotesRepository';
import { updateNoteService } from '../services/UpdateNoteService';
import { AppError } from '../../../shared/errors/AppError';

const updateNoteController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id;
    const note = { ...req.body };

    const notesRepository = new NotesRepository();
    try {
        await updateNoteService(note, id, notesRepository);
        return res
            .status(200)
            .json({ message: 'Nota atualizada com sucesso!' });
    } catch (error) {
        if (error instanceof AppError) {
            return res
                .status(error.statusCode)
                .json({ message: error.message });
        } else {
            next(error);
        }
    }
};

export { updateNoteController };
