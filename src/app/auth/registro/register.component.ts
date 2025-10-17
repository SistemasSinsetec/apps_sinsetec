import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['../auth-styles.css'], // ✅ Ruta al CSS compartido
})
export class RegisterComponent {
  regUser = '';
  regPass = '';
  regMail = '';
  regName = '';
  regLast = '';
  resultado = '';

  constructor(private auth: AuthService) {}

  async register() {
    this.resultado = await this.auth.enviar(
      [
        ['0x02', '0x05'],
        ['0x03', this.regUser],
        ['0x12', this.regPass],
        ['0x06', this.regMail],
        ['0x04', this.regName],
        ['0x05', this.regLast],
      ],
      'registro'
    );
  }
}
