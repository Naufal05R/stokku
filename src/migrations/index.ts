import * as migration_20260208_000103 from './20260208_000103';

export const migrations = [
  {
    up: migration_20260208_000103.up,
    down: migration_20260208_000103.down,
    name: '20260208_000103'
  },
];
