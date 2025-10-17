import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
})
export class ServiciosComponent {
  titulo = 'Nuestros Servicios';
  servicios = [
    { nombre: 'Diseño Web', descripcion: 'Sitios modernos y funcionales.' },
    { nombre: 'Backend', descripcion: 'APIs seguras y rápidas.' },
    { nombre: 'Soporte Técnico', descripcion: 'Mantenimiento de sistemas.' },
  ];
}
