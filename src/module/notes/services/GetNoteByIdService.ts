import { AppError } from '../../../shared/errors/AppError';
import { INotesRepository } from '../repositories/INotesRepository';

const getNoteByIdService = async (
    id: string,
    notesRepository: INotesRepository
) => {
    const note = await notesRepository.getById(id);

    if (!note) {
        throw new AppError('Nota não encontrada!', 404);
    }

    return note;
};

export { getNoteByIdService };
