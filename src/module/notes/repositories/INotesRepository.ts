import { Notes } from '../domain/Notes';
import { NotesDTO } from '../dtos/NotesDTOs';

export interface INotesRepository {
    create(data: NotesDTO): Promise<void>;
    getAll(): Promise<Notes[]>;
    getById(id: string): Promise<Notes | null>;
    update(data: NotesDTO, id: string): Promise<void>;
    delete(id: string): Promise<void>;
}
