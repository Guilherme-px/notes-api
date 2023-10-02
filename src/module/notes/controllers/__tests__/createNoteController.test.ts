import request from 'supertest';
import { app } from '../../../../shared/infra/http/app';
import { prisma as prismaTest } from '../../../../shared/infra/database/prismaTest';
import { NotesRepository } from '../../repositories/NotesRepository';
import { note1 } from '../../../test/mocks/noteMocks';

describe('NoteController', () => {
    beforeAll(async () => {
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
            const response = await request(app).post(`/notes`).send(note1);

            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                message: 'Nota criada com sucesso!',
            });
        });
    });
});
