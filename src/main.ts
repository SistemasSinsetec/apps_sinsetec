import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';

// 🚀 Arranque de la aplicación Angular standalone
bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), // conserva los providers definidos en app.config.ts
    provideHttpClient(), // ✅ añade el cliente HTTP globalmente
  ],
}).catch((err) => console.error(err));
