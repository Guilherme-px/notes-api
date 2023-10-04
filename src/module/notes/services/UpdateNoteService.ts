import { AppError } from '../../../shared/errors/AppError';
import { NotesDTO } from '../dtos/NotesDTOs';
import { INotesRepository } from '../repositories/INotesRepository';

const updateNoteService = async (
    note: NotesDTO,
    id: string,
    notaRepository: INotesRepository
) => {
    if (!note.title) {
        throw new AppError('Informe um titulo para a nota!', 400);
    }

    try {
        await notaRepository.update(note, id);
    } catch (error) {
        if (error instanceof AppError && error.statusCode === 404) {
            throw error;
        }
    }
};

export { updateNoteService };
