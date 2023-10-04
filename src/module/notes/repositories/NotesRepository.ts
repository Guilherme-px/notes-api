import { PrismaClient } from '@prisma/client';
import { INotesRepository } from './INotesRepository';
import { NotesDTO } from '../dtos/NotesDTOs';
import { Notes } from '../domain/Notes';

class NotesRepository implements INotesRepository {
    private readonly prisma: PrismaClient;

    constructor(prisma?: PrismaClient) {
        this.prisma =
            prisma || require('../../../shared/infra/database/prisma').prisma;
    }

    async create(data: NotesDTO): Promise<void> {
        await this.prisma.notes.create({
            data: data,
        });
    }

    async getAll(): Promise<Notes[]> {
        const companies = await this.prisma.notes.findMany();

        return companies;
    }

    async getById(id: string): Promise<Notes | null> {
        const note = await this.prisma.notes.findUnique({
            where: {
                id,
            },
        });

        return note;
    }

    async update(data: NotesDTO, id: string): Promise<void> {
        await this.prisma.notes.update({
            where: {
                id,
            },
            data,
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.notes.delete({
            where: {
                id,
            },
        });
    }
}

export { NotesRepository };
