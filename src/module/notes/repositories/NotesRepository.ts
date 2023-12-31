import { PrismaClient } from '@prisma/client';
import { INotesRepository } from './INotesRepository';
import { NotesDTO } from '../dtos/NotesDTOs';
import { Notes } from '../domain/Notes';
import { AppError } from '../../../shared/errors/AppError';

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

    async getAll(searchTerm?: string): Promise<Notes[]> {
        let notes: Notes[];

        if (searchTerm) {
            notes = await this.prisma.notes.findMany({
                where: {
                    title: {
                        contains: searchTerm,
                    },
                },
            });
        } else {
            notes = await this.prisma.notes.findMany();
        }

        return notes;
    }

    async getById(id: string): Promise<Notes | null> {
        const note = await this.prisma.notes.findUnique({
            where: {
                id,
            },
        });

        return note || null;
    }

    async update(data: NotesDTO, id: string): Promise<void> {
        try {
            await this.prisma.notes.update({
                where: {
                    id,
                },
                data,
            });
        } catch (error) {
            throw new AppError('Nota não encontrada!', 404);
        }
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
