import { NotesDTO } from '../dtos/NotesDTOs';
import { INotesRepository } from '../repositories/INotesRepository';

const createNoteService = async (
    note: NotesDTO,
    notesRepository: INotesRepository
) => {
    await notesRepository.create(note);
};

export { createNoteService };
