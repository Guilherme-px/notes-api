import { NotesDTO } from '../../notes/dtos/NotesDTOs';

const note1: NotesDTO = {
    title: 'Titulo da nota',
    description: 'descrição da nota',
    color: 'verde',
};

const invalidNote: NotesDTO = {
    title: '',
    description: '',
    color: '',
};

export { note1, invalidNote };
