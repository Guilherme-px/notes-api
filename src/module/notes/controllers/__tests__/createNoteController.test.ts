import request from 'supertest';
import { app } from '../../../../shared/infra/http/app';
import { prisma as prismaTest } from '../../../../shared/infra/database/prismaTest';
import { NotesRepository } from '../../repositories/NotesRepository';
import { note1 } from '../../../test/mocks/noteMocks';

describe('NoteController', () => {
    beforeEach(async () => {
        new NotesRepository(prismaTest);
    });

    afterEach(async () => {
        await prismaTest.notes.deleteMany({});
    });

    afterAll(async () => {
        await prismaTest.$disconnect();
    });

    describe('createNoteController', () => {
        it('should create a new note', async () => {
            const response = await request(app).post('/notes').send(note1);

            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                message: 'Nota criada com sucesso!',
            });
        });

        it('should handle errors and return an error response if title is null', async () => {
            const response = await request(app)
                .post(`/notes`)
                .send({ ...note1, title: '' });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe(
                'Informe um titulo para a nota!'
            );
        });
    });
});
