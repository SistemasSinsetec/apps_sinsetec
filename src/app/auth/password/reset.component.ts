import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './reset.component.html',
  styleUrls: ['../auth-styles.css'], // ✅ Ruta al CSS compartido
})
export class ResetComponent {
  resetUser = '';
  resetMail = '';
  resultado = '';

  constructor(private auth: AuthService) {}

  async resetPassword() {
    this.resultado = await this.auth.enviar(
      [
        ['0x02', '0x07'],
        ['0x03', this.resetUser],
        ['0x06', this.resetMail],
      ],
      'recuperación'
    );
  }
}
