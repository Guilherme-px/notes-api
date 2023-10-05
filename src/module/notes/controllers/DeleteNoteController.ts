import { NextFunction, Request, Response } from 'express';
import { deleteNoteService } from '../services/DeleteNoteService';
import { NotesRepository } from '../repositories/NotesRepository';
import { AppError } from '../../../shared/errors/AppError';

const deleteNoteController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id;
    const notesRepository = new NotesRepository();

    try {
        await deleteNoteService(id, notesRepository);
        return res.status(200).json({ message: 'Nota deletada com sucesso!' });
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

export { deleteNoteController };
