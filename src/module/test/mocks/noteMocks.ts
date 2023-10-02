import { NotesDTO } from '../../notes/dtos/NotesDTOs';

const note1: NotesDTO = {
    title: 'Titulo da nota',
    description: 'descrição da nota',
    color: 'verde',
    is_favorite: false,
};

const invalidNote: NotesDTO = {
    title: '',
    description: '',
    color: '',
    is_favorite: false,
};

export { note1, invalidNote };
