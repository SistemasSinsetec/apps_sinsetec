import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-solicitudes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
})
export class RegisterSolicitudesComponent {
  currentStep = 1;
  totalSteps = 2;
  submitted = false;

  solicitud = {
    cliente: '',
    solicitante: '',
    representante: '',
    ubicacion: '',
    descripcionServicio: '',
  };

  partidas = [
    {
      tipoTrabajo: '',
      naturalezaTrabajo: '',
      tipoMaquina: '',
      idMaquina: '',
      modeloMaquina: '',
      numeroSerie: '',
      fecha: '',
      horaInicio: '',
      horaTermino: '',
      tiempoEntrega: 0,
      contactoRecibe: '',
      cantidad: 0,
      precioUnitario: 0,
      iva: '8%',
      comentario: '',
    },
  ];

  tiposTrabajo = ['Mantenimiento', 'Reparación', 'Instalación'];
  naturalezasTrabajo = ['Preventivo', 'Correctivo', 'Urgente'];
  tiposMaquina = ['Prensa', 'Torno', 'CNC'];

  /** Paso siguiente / anterior */
  nextStep() {
    if (this.currentStep < this.totalSteps) this.currentStep++;
  }
  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  /** Agregar / eliminar partida */
  addPartida() {
    this.partidas.push({ ...this.partidas[0] });
  }
  eliminarPartida(i: number) {
    this.partidas.splice(i, 1);
  }

  /** Cálculos */
  get subtotal() {
    return this.partidas.reduce((s, p) => s + p.cantidad * p.precioUnitario, 0);
  }
  get ivaTotal() {
    return this.subtotal * 0.16;
  }
  get total() {
    return this.subtotal + this.ivaTotal;
  }

  /** Validación simple */
  isInvalid(campo: string) {
    return this.submitted && !campo;
  }

  /** Enviar datos */
  onSubmit() {
    this.submitted = true;
    if (!this.solicitud.cliente || !this.solicitud.solicitante) return;
    console.log('Solicitud enviada:', this.solicitud, this.partidas);
    alert(' Solicitud registrada correctamente');
  }
}
