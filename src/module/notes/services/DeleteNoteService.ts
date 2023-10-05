import { INotesRepository } from '../repositories/INotesRepository';
import { AppError } from '../../../shared/errors/AppError';

const deleteNoteService = async (
    id: string,
    noteRepository: INotesRepository
) => {
    const existingNote = await noteRepository.getById(id);

    if (!existingNote) {
        throw new AppError('Nota não encontrada!', 404);
    }

    await noteRepository.delete(id);
};

export { deleteNoteService };
