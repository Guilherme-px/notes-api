import { AppError } from '../../../../shared/errors/AppError';
import { note1, note2 } from '../../../test/mocks/noteMocks';
import { InMemoryNotesRepository } from '../../../test/repositories/InMemoryNotesRepository';
import { getAllNotesService } from '../GetAllNotesService';

let notesRepository: InMemoryNotesRepository;

interface AppErrorType extends Error {
    statusCode: number;
}

describe('getAllNotesService', () => {
    beforeEach(async () => {
        notesRepository = new InMemoryNotesRepository();

        await notesRepository.create(note1);
        await notesRepository.create(note2);
    });

    it('should return all notes from the repository', async () => {
        const notes = await getAllNotesService(notesRepository);

        expect(notes).toHaveLength(2);
        expect(notes).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    title: 'Titulo da nota',
                    color: 'verde',
                    is_favorite: false,
                }),
                expect.objectContaining({
                    title: 'Titulo da nota',
                    color: 'roxo',
                    is_favorite: false,
                }),
            ])
        );
    });

    it('should return an error if the notes is not found', async () => {
        try {
            await getAllNotesService(notesRepository);
        } catch (error) {
            const appError = error as AppErrorType;
            expect(appError).toBeInstanceOf(AppError);
            expect(appError.message).toBe('Nota não encontrada!');
            expect(appError.statusCode).toBe(404);
        }
    });

    it('should return all notes from the repository', async () => {
        const notes = await getAllNotesService(
            notesRepository,
            'Titulo da nota'
        );

        expect(notes).toHaveLength(2);
        expect(notes).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    title: 'Titulo da nota',
                    color: 'verde',
                    is_favorite: false,
                }),
                expect.objectContaining({
                    title: 'Titulo da nota',
                    color: 'roxo',
                    is_favorite: false,
                }),
            ])
        );
    });
});
