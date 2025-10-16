import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [FormsModule],
})
export class App {
  resetPassword() {
    this.enviar(
      //se envian los datos al backend
      [
        //se define un array de pares clave-valor que representan los campos del formulario
        ['0x02', '0x07'],
        ['0x03', this.resetUser],
        ['0x06', this.resetMail],
      ],
      'recuperación'
    );
  }

  login() {
    this.enviar(
      [
        //se envian los datos al backend
        ['0x02', '0x03'],
        ['0x03', this.loginUser],
        ['0x11', this.loginPass],
      ],
      'login'
    );
  }
  register() {
    this.enviar(
      [
        //se envian los datos al backend
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
  //estas son las variables que están siendo usadas en el formulario
  // Datos
  loginUser = ''; // Usuario de login
  loginPass = ''; // Contraseña de login
  regUser = ''; // Usuario de registro
  regPass = ''; // Contraseña de registro
  regMail = ''; // Correo de registro
  regName = ''; // Nombre de registro
  regLast = ''; // Apellido de registro
  resetUser = ''; // Usuario de recuperación
  resetMail = ''; // Correo de recuperación
  resultado = ''; // Resultado de la operación
  private api = 'https://apps.sinsetec.com.mx/sst-svc-servicios/';

  // Método para enviar datos al backend
  async enviar(campos: [string, string][], tipo: string) {
    const f = new FormData(); //se crea un nuevo objeto FormData
    f.append('0x01', ''); //es un campo (vacio) necesario por que el backend lo espera
    if (location.hostname.includes('localhost')) f.append('0xfa', 'true');
    //se agrega un campo adicional si se está en localhost
    campos.forEach(([k, v]) => f.append(k, v));
    //se agregan los campos proporcionados al FormData

    try {
      //se intenta ejecutar el bloque de codigo
      const res = await fetch(this.api, { method: 'POST', body: f }); //se envia la solicitud al backend
      //si la respuesta no es exitosa, se lanza un error
      if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
      //si la respuesta es exitosa, se procesa el texto de la respuesta
      const txt = await res.text();
      this.resultado = JSON.stringify(this.parse(txt), null, 2); //se intenta interpretar la respuesta
    } catch (e: any) {
      //si ocurre un error, se captura aquí
      this.resultado = `❌ Error en ${tipo}: ${e.message}`; //se muestra un mensaje de error
    }
  }
  catch(e: any) {
    //si ocurre un error, se captura aquí
    this.msg('Error: ' + e.message); //muestra un mensaje de error
  }
  private parse(t: string) {
    //intenta interpretar la respuesta como JSON
    try {
      //si no es posible, la devuelve como texto plano
      return JSON.parse(t); //intenta convertir el texto JSON en un objeto JS
    } catch {
      //si falla, se captura el error aquí
      return { raw: t }; //devuelve un objeto con la respuesta original en una propiedad 'raw'
    }
  }
  private msg(m: string) {
    //muestra un mensaje en el área de resultado
    this.resultado = m; //asigna el mensaje a la propiedad resultado
  }
}
