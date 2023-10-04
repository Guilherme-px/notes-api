import { AppError } from '../../../shared/errors/AppError';
import { Notes } from '../../notes/domain/Notes';
import { NotesDTO } from '../../notes/dtos/NotesDTOs';
import { INotesRepository } from '../../notes/repositories/INotesRepository';
import { v4 as uuidv4 } from 'uuid';

const uuid = uuidv4();

class InMemoryNotesRepository implements INotesRepository {
    public items: Notes[] = [];

    async create(note: NotesDTO): Promise<void> {
        this.items.push({
            ...note,
            id: uuid,
            created_at: new Date(),
            updated_at: new Date(),
        });
    }

    async getAll(): Promise<Notes[]> {
        return this.items;
    }

    async getById(id: string): Promise<Notes | null> {
        const note = this.items.find((item) => item['id'] === id);
        return note || null;
    }
    async update(note: NotesDTO, id: string): Promise<void> {
        const noteIndex = this.items.findIndex((note) => note.id === id);

        if (noteIndex === -1) {
            throw new AppError('Nota não encontrada!', 404);
        }

        const updatedNote = { ...this.items[noteIndex], ...note };
        this.items[noteIndex] = updatedNote;
    }

    async delete(id: string): Promise<void> {
        const noteIndex = this.items.findIndex((note) => note.id === id);

        if (noteIndex !== -1) {
            this.items.splice(noteIndex, 1);
        }
    }
}

export { InMemoryNotesRepository };
