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
  consulta: string = ''; //guarda el texto de la consulta
  resultado: string = ''; //guarda el resultado

  constructor(private http: HttpClient) {} //inyecta el servicio de httpclient para hecer la peticion HTTP

  enviar() {
    //funciona para enviar la consulta
    const lines = this.consulta
      .split('\n') //divide el texto en lineas
      .map((line) => line.trim()) //elimina los espacios
      .filter((line) => line); //elimina las lineas vacias

    //Si el textarea está vacío, se cancela la función y se muestra el error.
    if (lines.length < 1) {
      //Comprueba que al menos haya una línea escrita.
      this.resultado = 'Error: debes escribir el código de operación y los datos necesarios.';
      return;
    }
    // La primera línea siempre será el código de operación (0x03, 0x05, etc.)
    const codigoOperacion = lines[0]; //codigoOperacion guarda el primer valor de la primera linea
    const formData = new FormData(); //se crea un nuevo objeto formdata

    // Campo base siempre requerido
    formData.append('0x01', ''); // Token vacío
    formData.append('0x02', codigoOperacion); // Código dinámico que identifica la operación a realizar

    //login
    if (codigoOperacion === '0x03') {
      //comparación estricta (triple igual) a string '0x03'.
      if (lines.length < 3) {
        //para login necesitas 2 datos extra además del código de operación, mínimo 3 líneas totales.
        this.resultado = 'Error: faltan campos para LOGIN (usuario y contraseña)'; //mensaje de error
        return;
      }
      formData.append('0x03', lines[1]); // Usuario
      formData.append('0x11', lines[2]); // Contraseña/token
    } //Envía usuario (0x03) y contraseña (0x11). El backend PHP espera exactamente esos campos.

    // Registro.
    else if (codigoOperacion === '0x05') {
      //otra rama: registro.
      if (lines.length < 6) {
        //necesitas 5 datos extra más del código de operación, mínimo 6 líneas totales
        this.resultado =
          'Error: faltan campos para REGISTER (usuario, contraseña, correo, nombre, apellido)'; //mensaje de error
        return;
      }
      formData.append('0x03', lines[1]); // Usuario
      formData.append('0x12', lines[2]); // Nueva contraseña
      formData.append('0x06', lines[3]); // Correo
      formData.append('0x04', lines[4]); // Nombre
      formData.append('0x05', lines[5]); // Apellido
    }
    // Muestra lo que se está enviando en consola
    console.log('Datos enviados:', Object.fromEntries(formData.entries())); //imprime en la consola los datos enviados

    // Enviar al backend
    fetch('https://apps.sinsetec.com.mx/sst-svc-servicios/', {
      //url del backend
      method: 'POST', //metodo POST
      body: formData, //envia el formulario
    })
      .then(async (res) => {
        //res es la respuesta del servidor
        const text = await res.text(); //obtiene el texto de la respuesta
        let data: any = null; //crea una variable para almacenar los datos
        try {
          // intenta parsear el texto en JSON
          data = JSON.parse(text); //almacena los datos en la variable
        } catch {
          // si falla, guarda el texto original
          data = { raw: text }; //almacena el texto en la variable
        }
        return data; //devuelve los datos
      })
      .then((res) => {
        //res es la respuesta del servidor
        this.resultado = JSON.stringify(res, null, 2); //convierte los datos a JSON y los muestra en la consola
      })
      .catch((err) => {
        //si falla
        this.resultado = 'Error en la solicitud: ' + err.message; //mensaje de error
      });
  }
}
