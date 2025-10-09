import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  imports: [FormsModule],
})
export class App {
  consulta: string = '';
  resultado: string = '';
  constructor(private http: HttpClient) {}

  enviar() {
    this.http
      .post('https://apps.sinsetec.com.mx/sst-svc-servicios/', {
        consulta: this.consulta,
      })
      .subscribe({
        next: (res: any) => {
          this.resultado = JSON.stringify(res, null, 2);
        },
        error: (err) => {
          this.resultado = 'Error: ' + err.message;
        },
      });
  }
}
