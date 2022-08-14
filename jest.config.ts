// imports
import type { Config } from '@jest/types';
import { defaults } from 'jest-config';

// create configurations
const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testMatch: [...defaults.testMatch, '**/*.test.ts'],
    setupFiles: ['./jest.setup.ts']
};

// export configurations
export default config;
