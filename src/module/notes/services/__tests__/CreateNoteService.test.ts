import { AppError } from '../../../../shared/errors/AppError';
import { invalidNote, note1 } from '../../../test/mocks/noteMocks';
import { InMemoryNotesRepository } from '../../../test/repositories/InMemoryNotesRepository';
import { createNoteService } from '../CreateNoteService';

let notesRepository: InMemoryNotesRepository;

interface AppErrorType extends Error {
    statusCode: number;
}

describe('NoteService', () => {
    beforeEach(() => {
        notesRepository = new InMemoryNotesRepository();
    });

    describe('createNote', () => {
        it('should create a note with valid input data', async () => {
            await createNoteService(note1, notesRepository);

            expect(notesRepository.items).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        title: note1.title,
                        color: note1.color,
                    }),
                ])
            );
        });

        it('should handle validation errors for invalid input data', async () => {
            try {
                await createNoteService(invalidNote, notesRepository);
            } catch (error) {
                expect(error).toBeDefined();
            }

            expect(notesRepository.items.length).toBe(0);
        });

        it('should throw an error when title is not informed', async () => {
            try {
                await createNoteService(
                    { ...note1, title: '' },
                    notesRepository
                );
            } catch (error) {
                const appError = error as AppErrorType;
                expect(appError).toBeInstanceOf(AppError);
                expect(appError.message).toBe('Informe um titulo para a nota!');
                expect(appError.statusCode).toBe(400);
            }

            expect(notesRepository.items.length).toBe(0);
        });
    });
});
