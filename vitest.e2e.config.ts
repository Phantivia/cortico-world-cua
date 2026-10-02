import { realpathSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

/** Desktop end-to-end tests: real mouse and keyboard on this machine, one file at a time. */
const FRAMEWORK_DIR = realpathSync(dirname(createRequire(import.meta.url).resolve('cortico/package.json')));

export default defineConfig({
  server: { fs: { allow: [fileURLToPath(new URL('./', import.meta.url)), FRAMEWORK_DIR] } },
  test: {
    include: ['tests/e2e/**/*.test.ts'],
    env: { CORTICO_LANGUAGE: 'zh' },
    fileParallelism: false,
    testTimeout: 120_000,
    hookTimeout: 120_000,
    pool: 'forks',
  },
});
