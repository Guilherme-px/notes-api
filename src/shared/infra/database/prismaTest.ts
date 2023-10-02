import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config({ path: '.env.test' });

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

export { prisma };
