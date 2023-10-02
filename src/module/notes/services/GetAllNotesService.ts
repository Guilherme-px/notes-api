import { AppError } from '../../../shared/errors/AppError';
import { INotesRepository } from '../repositories/INotesRepository';

const getAllNotesService = async (notesRepository: INotesRepository) => {
    const notes = await notesRepository.getAll();

    if (!notes) {
        throw new AppError('Nenhuma nota encontrada!', 404);
    }

    return notes;
};

export { getAllNotesService };
