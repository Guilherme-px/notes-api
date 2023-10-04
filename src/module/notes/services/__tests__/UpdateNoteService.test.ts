import { updateNoteService } from '../UpdateNoteService';
import { InMemoryNotesRepository } from '../../../test/repositories/InMemoryNotesRepository';
import {
    updatedNoteData,
    note1,
    invalidNote,
} from '../../../test/mocks/noteMocks';
import { AppError } from '../../../../shared/errors/AppError';
import { v4 as uuidv4 } from 'uuid';

let noteRepository: InMemoryNotesRepository;
const uuid = uuidv4();
let id: string;

interface AppErrorType extends Error {
    statusCode: number;
}

describe('updateNoteService', () => {
    beforeEach(async () => {
        noteRepository = new InMemoryNotesRepository();

        await noteRepository.create(note1);
        const notes = await noteRepository.getAll();
        id = notes[0].id;
    });

    it('should update note data', async () => {
        await updateNoteService(updatedNoteData, id, noteRepository);

        const updatedNote = await noteRepository.getById(id);

        expect(updatedNote).toMatchObject(updatedNoteData);
    });

    it('should throw an error when title is not informed', async () => {
        try {
            await updateNoteService(invalidNote, id, noteRepository);
        } catch (error) {
            const appError = error as AppErrorType;
            expect(appError).toBeInstanceOf(AppError);
            expect(appError.message).toBe('Informe um titulo para a nota!');
            expect(appError.statusCode).toBe(400);
        }

        expect(noteRepository.items.length).toBe(1);
    });

    it('should throw an error when note is not found', async () => {
        try {
            await updateNoteService(note1, uuid, noteRepository);
        } catch (error) {
            const appError = error as AppErrorType;
            expect(appError).toBeInstanceOf(AppError);
            expect(appError.message).toBe('Nota não encontrada!');
            expect(appError.statusCode).toBe(404);
        }

        expect(noteRepository.items.length).toBe(1);
    });
});
