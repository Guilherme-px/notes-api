import { NextFunction, Request, Response } from 'express';
import { getAllNotesService } from '../services/GetAllNotesService';
import { NotesRepository } from '../repositories/NotesRepository';
import { AppError } from '../../../shared/errors/AppError';

const getAllNotesController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const searchTerm: string = (req.query.search as string) || '';
    const notesRepository = new NotesRepository();

    try {
        const notes = await getAllNotesService(notesRepository, searchTerm);

        return res.status(200).json(notes);
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

export { getAllNotesController };
