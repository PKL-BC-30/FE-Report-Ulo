import { lazy } from 'solid-js';
import type { RouteDefinition } from '@solidjs/router';

import Dashboard from './pages/uloreport';
import AboutData from './pages/about.data';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/about',
    component: lazy(() => import('./pages/about')),
    data: AboutData,
  }
];
