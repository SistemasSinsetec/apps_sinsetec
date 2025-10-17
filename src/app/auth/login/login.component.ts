import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['../auth-styles.css'], // ✅ Ruta al CSS compartido
})
export class LoginComponent {
  loginUser = '';
  loginPass = '';
  resultado = '';

  constructor(private auth: AuthService) {}

  async login() {
    this.resultado = await this.auth.enviar(
      [
        ['0x02', '0x03'],
        ['0x03', this.loginUser],
        ['0x11', this.loginPass],
      ],
      'login'
    );
  }
}
