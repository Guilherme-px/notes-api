import { AppError } from '../../../shared/errors/AppError';
import { NotesDTO } from '../dtos/NotesDTOs';
import { INotesRepository } from '../repositories/INotesRepository';

const createNoteService = async (
    note: NotesDTO,
    notesRepository: INotesRepository
) => {
    if (!note.title) {
        throw new AppError('Informe um titulo para a nota!', 400);
    }

    if (!note.description) {
        throw new AppError('Informe uma descrição para a nota!', 400);
    }

    await notesRepository.create(note);
};

export { createNoteService };
