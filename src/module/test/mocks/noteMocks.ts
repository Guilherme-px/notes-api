import { NotesDTO } from '../../notes/dtos/NotesDTOs';

const note1: NotesDTO = {
    title: 'Titulo da nota',
    description: 'descrição da nota',
    color: 'verde',
    is_favorite: false,
};

const note2: NotesDTO = {
    title: 'Titulo da nota',
    description: 'descrição da nota',
    color: 'roxo',
    is_favorite: false,
};

const invalidNote: NotesDTO = {
    title: '',
    description: '',
    color: '',
    is_favorite: false,
};

export { note1, note2, invalidNote };
