import { AppError } from '../../../../shared/errors/AppError';
import { note1, note2 } from '../../../test/mocks/noteMocks';
import { InMemoryNotesRepository } from '../../../test/repositories/InMemoryNotesRepository';
import { getNoteByIdService } from '../GetNoteByIdService';
import { v4 as uuidv4 } from 'uuid';

let noteRepository: InMemoryNotesRepository;
const uuid = uuidv4();

interface AppErrorType extends Error {
    statusCode: number;
}

describe('getNoteByIdService', () => {
    beforeEach(async () => {
        noteRepository = new InMemoryNotesRepository();

        await noteRepository.create(note1);
        await noteRepository.create(note2);
    });

    it('should return note by id from the repository', async () => {
        const notes = await noteRepository.getAll();
        const id = notes[1].id;

        const note = await getNoteByIdService(id, noteRepository);

        expect(note!.id).toEqual(id);
    });

    it('should return an error if the note is not found', async () => {
        const id = uuid;

        try {
            await getNoteByIdService(id, noteRepository);
        } catch (error) {
            const appError = error as AppErrorType;
            expect(appError).toBeInstanceOf(AppError);
            expect(appError.message).toBe('Nota não encontrada!');
            expect(appError.statusCode).toBe(404);
        }
    });
});
