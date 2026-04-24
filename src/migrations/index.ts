import * as migration_20260418_035743_init_migrations from './20260418_035743_init_migrations';
import * as migration_20260424_041014_rbac_user_role from './20260424_041014_rbac_user_role';

export const migrations = [
  {
    up: migration_20260418_035743_init_migrations.up,
    down: migration_20260418_035743_init_migrations.down,
    name: '20260418_035743_init_migrations',
  },
  {
    up: migration_20260424_041014_rbac_user_role.up,
    down: migration_20260424_041014_rbac_user_role.down,
    name: '20260424_041014_rbac_user_role'
  },
];
