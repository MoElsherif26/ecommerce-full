import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'check-out/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'details/:id',
    renderMode: RenderMode.Server
  },

  {
    path: '**',
    // renderMode: RenderMode.Server
    renderMode: RenderMode.Prerender
  }
];
