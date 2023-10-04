import request from 'supertest';
import { app } from '../../../../shared/infra/http/app';
import { prisma as prismaTest } from '../../../../shared/infra/database/prismaTest';
import { NotesRepository } from '../../repositories/NotesRepository';
import { note1, note2 } from '../../../test/mocks/noteMocks';

let notesRepository: NotesRepository;

describe('NoteController', () => {
    describe('getNoteByIdController', () => {
        beforeEach(async () => {
            notesRepository = new NotesRepository(prismaTest);

            await request(app).post('/notes').send(note1);
            await request(app).post('/notes').send(note2);
        });

        afterEach(async () => {
            await prismaTest.notes.deleteMany({});
        });

        afterAll(async () => {
            await prismaTest.$disconnect();
        });

        it('should retrieve a note', async () => {
            const responseId = await request(app).get('/notes');

            const id = responseId.body[0].id;

            const response = await request(app).get(`/notes/${id}`);

            expect(response.status).toBe(200);
            expect(response.body.id).toEqual(id);
        });

        it('should return an error message if no note is found', async () => {
            const id = '65168bcd13374b681bf25bb9';

            const response = await request(app).get(`/notes/${id}`);

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Nenhuma nota encontrada!');
        });
    });
});
