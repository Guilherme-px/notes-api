module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '/^@prisma/(.*)$/': '<rootDir>/prisma/$1',
    },
    resolver: undefined,
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            { tsconfig: '<rootDir>/tsconfig.test.json' },
        ],
    },
    collectCoverage: true,
    coverageDirectory: 'coverage',
    testMatch: ['<rootDir>/src/**/*.test.ts'],
    testTimeout: 1000000,
};
