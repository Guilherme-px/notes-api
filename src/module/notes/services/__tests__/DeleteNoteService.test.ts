import { deleteNoteService } from '../DeleteNoteService';
import { InMemoryNotesRepository } from '../../../test/repositories/InMemoryNotesRepository';
import { note1 } from '../../../test/mocks/noteMocks';
import { AppError } from '../../../../shared/errors/AppError';
import { v4 as uuidv4 } from 'uuid';

let noteRepository: InMemoryNotesRepository;
const uuid = uuidv4();
let id: string;

interface AppErrorType extends Error {
    statusCode: number;
}

describe('deleteNoteService', () => {
    beforeEach(async () => {
        noteRepository = new InMemoryNotesRepository();

        await noteRepository.create(note1);
        const notes = await noteRepository.getAll();
        id = notes[0].id;
    });

    it('should delete an existing note', async () => {
        await deleteNoteService(id, noteRepository);

        expect(noteRepository.items.length).toBe(0);
    });

    it('should return error 404 when trying to delete a note that does not exist', async () => {
        try {
            await deleteNoteService(uuid, noteRepository);
        } catch (error) {
            const appError = error as AppErrorType;
            expect(appError).toBeInstanceOf(AppError);
            expect(appError.message).toBe('Nota não encontrada!');
            expect(appError.statusCode).toBe(404);
        }
    });
});
