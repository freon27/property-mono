import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideTanStackQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental'

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideTanStackQuery(new QueryClient()), provideRouter(appRoutes)],
};
