import { NextFunction, Request, Response } from 'express';
import { createNoteService } from '../services/CreateNoteService';
import { NotesRepository } from '../repositories/NotesRepository';
import { AppError } from '../../../shared/errors/AppError';

const createNoteController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const note = { ...req.body };

    const notesRepository = new NotesRepository();
    try {
        await createNoteService(note, notesRepository);
        return res.status(201).json({ message: 'Nota criada com sucesso!' });
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            next(error);
        }
    }
};

export { createNoteController };
