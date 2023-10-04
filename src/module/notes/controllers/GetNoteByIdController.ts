import { NextFunction, Request, Response } from 'express';
import { getNoteByIdService } from '../services/GetNoteByIdService';
import { NotesRepository } from '../repositories/NotesRepository';
import { AppError } from '../../../shared/errors/AppError';

const getNoteByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id;
    const notesRepository = new NotesRepository();

    try {
        const note = await getNoteByIdService(id, notesRepository);
        return res.status(200).json(note);
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

export { getNoteByIdController };
