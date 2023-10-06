import request from 'supertest';
import { app } from '../../../../shared/infra/http/app';
import { prisma as prismaTest } from '../../../../shared/infra/database/prismaTest';
import { NotesRepository } from '../../repositories/NotesRepository';
import { note1, note2 } from '../../../test/mocks/noteMocks';

describe('NotesController', () => {
    beforeEach(async () => {
        new NotesRepository(prismaTest);

        await request(app).post('/notes').send(note1);
        await request(app).post('/notes').send(note2);
    });

    afterEach(async () => {
        await prismaTest.notes.deleteMany({});
    });

    afterAll(async () => {
        await prismaTest.$disconnect();
    });

    describe('getAllNotesController', () => {
        it('should retrieve a list of notes', async () => {
            const response = await request(app).get('/notes');

            expect(response.status).toBe(200);
        });

        it('should retrieve a list of notes', async () => {
            const searchTerm = note1.title;
            const response = await request(app).get(
                `/notes?searchTerm=${searchTerm}`
            );

            expect(response.status).toBe(200);
        });
    });
});
