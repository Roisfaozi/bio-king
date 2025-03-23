process.env.DATABASE_URL =
  'postgresql://bio:biopassword@localhost:5432/bio_test';

// Mock nanoid module
jest.mock('nanoid', () => ({
  customAlphabet: jest.fn().mockImplementation(() => jest.fn(() => 'abc123')),
}));

// Mock other ESM modules if needed
jest.mock('node:crypto', () => ({
  webcrypto: {
    getRandomValues: jest.fn((array) => {
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
      return array;
    }),
  },
}));
