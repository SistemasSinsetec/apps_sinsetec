// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'https://apps.sinsetec.com.mx/sst-svc-servicios/';

  async enviar(campos: [string, string][], tipo: string): Promise<string> {
    const f = new FormData();
    f.append('0x01', '');
    if (location.hostname.includes('localhost')) f.append('0xfa', 'true');
    campos.forEach(([k, v]) => f.append(k, v));

    try {
      const res = await fetch(this.api, { method: 'POST', body: f });
      if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
      const txt = await res.text();
      return JSON.stringify(this.parse(txt), null, 2);
    } catch (e: any) {
      return `❌ Error en ${tipo}: ${e.message}`;
    }
  }

  private parse(t: string) {
    try {
      return JSON.parse(t);
    } catch {
      return { raw: t };
    }
  }
}
