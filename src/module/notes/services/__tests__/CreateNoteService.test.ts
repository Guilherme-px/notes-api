import { note1 } from '../../../test/mocks/noteMocks';
import { InMemoryNotesRepository } from '../../../test/repositories/InMemoryNotesRepository';
import { createNoteService } from '../CreateNoteService';

let notesRepository: InMemoryNotesRepository;

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
                        description: note1.description,
                        color: note1.color,
                    }),
                ])
            );
        });
    });
});
