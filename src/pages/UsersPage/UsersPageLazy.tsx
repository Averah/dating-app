import { lazy } from 'react';

const UsersPageLazy = lazy(() => import('./UsersPage'));

export default UsersPageLazy;