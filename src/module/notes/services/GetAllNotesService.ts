import { AppError } from '../../../shared/errors/AppError';
import { INotesRepository } from '../repositories/INotesRepository';

const getAllNotesService = async (
    notesRepository: INotesRepository,
    searchTerm?: string
) => {
    const notes = await notesRepository.getAll(searchTerm);

    if (!notes || notes.length === 0) {
        throw new AppError('Nota não encontrada!', 404);
    }

    return notes;
};

export { getAllNotesService };
