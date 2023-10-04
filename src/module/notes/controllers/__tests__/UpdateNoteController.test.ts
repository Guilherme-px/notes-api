import request from 'supertest';
import { app } from '../../../../shared/infra/http/app';
import { prisma as prismaTest } from '../../../../shared/infra/database/prismaTest';
import { NotesRepository } from '../../repositories/NotesRepository';
import { updatedNoteData, note1 } from '../../../test/mocks/noteMocks';

describe('NoteController', () => {
    describe('NoteController', () => {
        beforeEach(async () => {
            new NotesRepository(prismaTest);

            await request(app).post('/notes').send(note1);
        });

        afterEach(async () => {
            await prismaTest.notes.deleteMany({});
        });

        afterAll(async () => {
            await prismaTest.$disconnect();
        });

        it('should update a note', async () => {
            const responseId = await request(app).get('/notes');
            const id = responseId.body[0].id;

            const response = await request(app)
                .put(`/notes/${id}`)
                .send(updatedNoteData);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: 'Nota atualizada com sucesso!',
            });
        });

        it('should return an error message if no note is found', async () => {
            const id = '65168bcd13374b681bf25bb7';

            const response = await request(app)
                .put(`/notes/${id}`)
                .send(updatedNoteData);

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Nota não encontrada!');
        });
    });
});
